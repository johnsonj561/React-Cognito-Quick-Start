import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { CognitoAuth } from 'amazon-cognito-auth-js'; // adds just 10KB to bundle size

import Config from '../../config';

const UserPoolId = Config.COGNITO_POOL_ID;
const ClientId = Config.COGNITO_APP_ID;

export default 'Unexpected default export, export CognitoAuthorizer class to interact with Cognito';

let currentAuthorizer;

const authCredentials = {
  ClientId: Config.COGNITO_APP_ID,
  AppWebDomain: Config.COGNITO_APP_DOMAIN,
  TokenScopesArray: Config.COGNITO_SCOPE,
  RedirectUriSignIn: Config.COGNITO_REDIRECT_URI,
  RedirectUriSignOut: Config.COGNITO_REDIRECT_URI,
  IdentityProvider: Config.COGNITO_ID_PROVIDER,
  UserPoolId: Config.COGNITO_POOL_ID,
  AdvancedSecurityDataCollectionFlag: false
};


export function CognitoAuthorizer() {
  this.Pool = new CognitoUserPool({ UserPoolId, ClientId });
  this.cognitoUser = false;
  this.session = false;
  this.sessionInterval = false;
  this.sessionIntervalMs = 5 * 1000;
  this.expWarningSeconds = 3560;
  // authHelper provided by amazon-cognito-auth.js
  // provides some useful functionality we will reuse
  this.authHelper = new CognitoAuth(authCredentials);
  this.authHelper.useCodeGrantFlow();
  currentAuthorizer = this;
}


CognitoAuthorizer.prototype.signInUser = function signIn(Username, Password) {
  const authenticationData = new AuthenticationDetails({ Username, Password });
  this.cognitoUser = new CognitoUser({ Username, Pool: this.Pool });
  const self = this;
  return new Promise((resolve, reject) => {
    this.cognitoUser.authenticateUser(authenticationData, {
      onSuccess: (session) => {
        self.session = session;
        self.sessionInterval = setInterval(() => self.checkSession(), self.sessionIntervalMs);
        resolve(session);
      },
      onFailure: err => reject(err)
    });
  });
};


CognitoAuthorizer.prototype.signOutUser = function signOutUser() {
  if (this.cognitoUser) {
    this.cognitoUser.signOut();
    clearInterval(this.sessionInterval);
    return true;
  }
  return false;
};


CognitoAuthorizer.prototype.checkSession = function checkSession() {
  if (!this.session) return;
  const idTokenDetails = this.session.idToken.payload;
  const idExpSeconds = idTokenDetails.exp;
  const nowSeconds = new Date().getTime() / 1000;
  const secondsToExpiration = Math.floor(idExpSeconds - nowSeconds);
  if (secondsToExpiration < this.expWarningSeconds) {
    const refreshTokenObj = this.session.getRefreshToken();
    const refreshToken = refreshTokenObj.refreshToken || refreshTokenObj.token;
    if (refreshToken) {
      const self = this;
      this.authHelper.userhandler = {
        onSuccess: (session) => {
          self.session = session;
        },
        onFailure: err => console.log('error refreshing token', err)
      };
      this.authHelper.refreshSession(refreshToken);
      console.log('token refreshed');
    }
    console.log('session is going to expire in ', secondsToExpiration, 'refresh your token');
  }
};


CognitoAuthorizer.prototype.registerUser = function signUp(formData) {
  const {
    email, password, password2
  } = formData;
  return new Promise((resolve, reject) => {
    if (password !== password2) {
      const err = new Error('Passwords do not match');
      err.code = 'PasswordMismatch';
      setTimeout(() => reject(err));
    } else {
      this.Pool.signUp(email, password, null, null, (err, resp) => {
        if (err) reject(err);
        else {
          this.cognitoUser = new CognitoUser({ Username: email, Pool: this.Pool });
          resolve(resp);
        }
      });
    }
  });
};


CognitoAuthorizer.prototype.confirmUser = function confirmUser(Username, confirmationCode) {
  this.cognitoUser = new CognitoUser({ Username, Pool: this.Pool });
  return new Promise((resolve, reject) => {
    this.cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};


CognitoAuthorizer.prototype.resendConfirmationCode = function resendConfirmationCode() {
  return new Promise((resolve, reject) => {
    if (this.cognitoUser) {
      this.cognitoUser.resendConfirmationCode((err, resp) => {
        if (err) reject(err);
        else resolve(resp);
      });
    } else {
      const err = new Error('Cognito user not found');
      err.code = 'CognitoUserNotFound';
      setTimeout(() => reject(err));
    }
  });
};


CognitoAuthorizer.prototype.requestPasswordReset = function requestPasswordReset(Username) {
  this.cognitoUser = new CognitoUser({ Username, Pool: this.Pool });
  return new Promise((resolve, reject) => {
    this.cognitoUser.forgotPassword({
      onSuccess: result => resolve(result),
      onFailure: err => reject(err)
    });
  });
};


CognitoAuthorizer.prototype.submitNewPassword = function submitNewPassword(formData) {
  const { confirmationCode, password, password2 } = formData;
  return new Promise((resolve, reject) => {
    if (password !== password2) {
      const err = new Error('Passwords do not match');
      err.code = 'PasswordMismatch';
      setTimeout(() => reject(err));
    } else {
      this.cognitoUser.confirmPassword(confirmationCode, password, {
        onSuccess: resp => resolve(resp),
        onFailure: err => reject(err)
      });
    }
  });
};


CognitoAuthorizer.prototype.getSessionFromStorage = function getSessionFromStorage() {
  this.cognitoUser = this.Pool.getCurrentUser();
  const self = this;
  return new Promise((resolve, reject) => {
    if (this.cognitoUser) {
      this.cognitoUser.getSession((err, session) => {
        if (err || !session.isValid()) reject(err);
        else {
          self.session = session;
          self.sessionInterval = setInterval(() => self.checkSession(), self.sessionIntervalMs);
          resolve(session);
        }
      });
    } else setTimeout(() => reject());
  });
};


CognitoAuthorizer.prototype.getUsername = function getUsername() {
  const { idToken: { payload: { email } = {} } = {} } = this.session;
  return email;
};


CognitoAuthorizer.prototype.requestGoogleAuth = function requestGoogleAuth() {
  window.location.href = Config.COGNITO_ID_PROVIDER_URL;
};


CognitoAuthorizer.prototype.parseUrlCode = function parseUrlCode(url) {
  return new Promise((resolve, reject) => {
    this.authHelper.userhandler = {
      onSuccess: () => {
        this.getSessionFromStorage();
        resolve();
      },
      onFailure: err => reject(err)
    };
    this.authHelper.parseCognitoWebResponse(url);
  });
};


export const getCurrentAuthorizer = () => currentAuthorizer;
