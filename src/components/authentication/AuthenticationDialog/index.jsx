import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import { LinearProgress } from 'material-ui/Progress';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import ConfirmRegistrationForm from '../forms/ConfirmRegistrationForm';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { CognitoAuthorizer } from '../../../utils/CognitoUtil';


const snackbarDelay = 3 * 1000;

const defaultState = {
  cognitoAuthorizer: false,
  errors: {},
  currentForm: 'login',
  currentUser: false,
  loading: false,
  snackbarMessage: false,
  passwordCodeRequested: false,
};


class AuthenticationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };

    this.getSession = this.getSession.bind(this);
    this.handleValidSession = this.handleValidSession.bind(this);

    this.handleError = this.handleError.bind(this);
    this.clearErrors = this.clearErrors.bind(this);

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
    this.handleConfirmationSubmit = this.handleConfirmationSubmit.bind(this);
    this.handleNewPasswordSubmit = this.handleNewPasswordSubmit.bind(this);
    this.handleNewPasswordRequest = this.handleNewPasswordRequest.bind(this);
    this.handleGoogleAuthClick = this.handleGoogleAuthClick.bind(this);

    this.toggleSnackbar = this.toggleSnackbar.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.displayForm = this.displayForm.bind(this);
  }


  componentDidMount() {
    this.getSession();
  }


  getSession() {
    const cognitoAuthorizer = new CognitoAuthorizer();
    this.setState({ cognitoAuthorizer });
    if (window.location.href.match(/.*?code=(.*)$/)) {
      cognitoAuthorizer.parseUrlCode(window.location.href)
        .then(() => this.handleValidSession())
        .catch(() => this.displayForm('login'));
    } else {
      cognitoAuthorizer.getSessionFromStorage()
        .then(() => {
          this.handleValidSession();
        })
        .catch((() => this.displayForm('login')));
    }
  }


  handleValidSession() {
    const currentUser = this.state.cognitoAuthorizer.getUsername();
    this.setState({ currentUser });
  }


  handleError({ code, message }) {
    switch (code) {
      case 'UsernameExistsException':
        this.setState({ errors: { emailError: 'Username in use' } });
        return;
      case 'NotAuthorizedException':
        this.setState({ errors: { passwordError: message } });
        return;
      case 'ConfirmationException':
        this.setState({ errors: { confirmationError: 'Invalid confirmation' } });
        return;
      case 'UserNotConfirmedException':
        this.displayForm('confirmRegistration');
        return;
      case 'UserNotFoundException':
        this.setState({ errors: { emailError: 'Username not found' } });
        return;
      case 'PasswordMismatch':
        this.setState({ errors: { passwordError: 'Passwords do not match' } });
        return;
      case 'InvalidPasswordException':
        this.setState({ errors: { passwordError: 'Invalid password' } });
        return;
      default:
        this.setState({ errors: { passwordError: 'Unexpected error' } });
    }
  }


  toggleLoading(loading) {
    this.setState({ loading });
  }


  toggleSnackbar(snackbarMessage, delay) {
    this.setState({ snackbarMessage });
    if (delay) {
      setTimeout(() => this.toggleSnackbar(), delay);
    }
  }


  handleLoginSubmit(formData) {
    const { email, password } = formData;
    this.toggleLoading(true);
    // store email, will need it in case of confirmation requirement
    this.setState({ email });
    this.state.cognitoAuthorizer.signInUser(email, password)
      .then(() => this.handleValidSession())
      .catch((err) => {
        this.handleError(err);
        this.toggleLoading();
      });
  }


  handleRegistrationSubmit(formData) {
    this.toggleLoading(true);
    this.state.cognitoAuthorizer.registerUser(formData)
      .then((resp) => {
        const email = resp.user.username;
        this.setState({ email });
        this.displayForm('confirmRegistration');
      })
      .catch(err => this.handleError(err))
      .then(() => this.toggleLoading());
  }


  handleConfirmationSubmit(confirmationCode) {
    const { email } = this.state;
    this.toggleLoading(true);
    this.state.cognitoAuthorizer.confirmUser(email, confirmationCode)
      .then((resp) => {
        if (resp === 'SUCCESS') {
          this.displayForm('login');
        } else {
          this.handleError('ConfirmationException');
        }
      })
      .catch(() => this.handleError('ConfirmationException'))
      .then(() => this.toggleLoading());
  }


  handleNewPasswordRequest(email) {
    this.toggleLoading(true);
    this.state.cognitoAuthorizer.requestPasswordReset(email)
      .then((resp) => {
        const { Destination } = resp.CodeDeliveryDetails;
        this.setState({ passwordCodeRequested: true });
        this.toggleSnackbar(`Password reset key sent to ${Destination}`, snackbarDelay);
      })
      .catch(err => this.handleError(err))
      .then(() => this.toggleLoading());
  }


  handleNewPasswordSubmit(formData) {
    this.toggleLoading(true);
    this.state.cognitoAuthorizer.submitNewPassword(formData)
      .then(() => {
        this.toggleSnackbar('Password reset', snackbarDelay);
        this.displayForm('login');
      })
      .catch(err => this.handleError(err))
      .then(() => this.toggleLoading());
  }


  handleGoogleAuthClick() {
    this.toggleLoading(true);
    this.state.cognitoAuthorizer.requestGoogleAuth();
  }


  displayForm(currentForm) {
    this.setState({ currentForm, errors: {} });
  }


  clearErrors() {
    const errors = Object.keys(this.state.errors).reduce((accum, key) => {
      accum[key] = '';
      return accum;
    }, {});
    this.setState({ errors });
  }


  render() {
    const {
      errors,
      currentForm,
      loading,
      snackbarMessage,
      passwordCodeRequested,
      currentUser,
      cognitoAuthorizer
    } = this.state;

    const progressStyle = (loading) ? {} : { visibility: 'hidden' };

    return (
      <React.Fragment>
        {!currentUser &&
          <React.Fragment>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={!!snackbarMessage}
              onClose={() => this.toggleSnackbar()}
              message={<span>{snackbarMessage}</span>}
            />
            <Dialog
              open
              onClose={this.handleClose}
              maxWidth="xs"
              disableBackdropClick
            >

              <LinearProgress color="primary" style={progressStyle} />

              <DialogContent className="dialog-content">

                {(currentForm === 'login') &&
                  <LoginForm
                    handleRegisterClick={() => this.displayForm('register')}
                    handleSubmit={this.handleLoginSubmit}
                    clearErrors={this.clearErrors}
                    emailError={errors.emailError}
                    passwordError={errors.passwordError}
                    loading={loading}
                    toggleSnackbar={this.toggleSnackbar}
                    handleForgotPassword={() => this.displayForm('forgotPassword')}
                    handleGoogleAuthClick={this.handleGoogleAuthClick}
                  />
                }

                {(currentForm === 'register') &&
                  <RegisterForm
                    handleClose={() => this.displayForm('login')}
                    handleSubmit={this.handleRegistrationSubmit}
                    emailError={errors.emailError}
                    passwordError={errors.passwordError}
                    clearErrors={this.clearErrors}
                    loading={loading}
                  />
                }

                {(currentForm === 'confirmRegistration') &&
                  <ConfirmRegistrationForm
                    handleClose={() => this.displayForm('login')}
                    handleSubmit={this.handleConfirmationSubmit}
                    clearErrors={this.clearErrors}
                    confirmationError={errors.confirmationError}
                    loading={loading}
                  />
                }

                {(currentForm === 'forgotPassword') &&
                  <ForgotPasswordForm
                    handleClose={() => this.displayForm('login')}
                    handleSubmit={this.handleNewPasswordSubmit}
                    handleNewPasswordRequest={this.handleNewPasswordRequest}
                    emailError={errors.emailError}
                    passwordError={errors.passwordError}
                    clearErrors={this.clearErrors}
                    loading={loading}
                    passwordCodeRequested={passwordCodeRequested}
                  />
                }

              </DialogContent>
            </Dialog>
          </React.Fragment>
        }


        {/* If User Authenticated, Render Child Component */}
        {/* Pass Child Component Reference to CognitoAuthorizer Instance */}
        {/* CognitoAuthorizer instance provides Cognito API */}
        {!!currentUser &&
          React.cloneElement(this.props.children, { currentUser, cognitoAuthorizer })
        }

      </React.Fragment>
    );
  }
}


AuthenticationDialog.propTypes = {
  children: PropTypes.object.isRequired
};

export default AuthenticationDialog;
