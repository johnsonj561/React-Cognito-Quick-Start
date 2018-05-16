// Pool Id - AWS Console -> Cognito User Pool -> General Settings
const COGNITO_POOL_ID = 'us-east-2_649edFXmY';


// Pool Id - AWS Console -> Cognito User Pool -> General Settings ->  App Clients
const COGNITO_APP_ID = 'dk8k05gcop9f6ssp4nbl6052l';


// Pool Id - AWS Console -> Cognito User Pool -> App Integration -> Domain Name
// exclude https:// , e.g. mycustomdomain.auth.us-east-2.amazoncognito.com
const COGNITO_APP_DOMAIN = 'reactreduxapp.auth.us-east-2.amazoncognito.com';


// Redirect URI that cognito redirects to after login
// Must be listed at:
// AWS Console -> Cognito User Pool -> App Integration -> App Client Settings -> Callback URLs
const COGNITO_REDIRECT_URI = 'http://localhost:3000';
// const COGNITO_REDIRECT_URI = 'https://myreactapp.com'


// Identity Providers Being Used
// Currently just set to 1, need to look into adding multiple identity providers
// Enable identity provider at:
// AWS Console -> Cognito User Pool -> Federation -> Identity Providers
// AWS Console -> Cognito User Pool -> Federation -> Attribute Mapping
// AWS Console -> Cognito User Pool -> App Integration -> App Client Settings -> Enabled Providers
const COGNITO_ID_PROVIDER = 'Google';


// Data that will be shared by 3rd party identity providers
// Must be defined at:
// AWS Console -> Cognito User Pool -> App Integration -> App Client Settings -> Allowed Scopes
const COGNITO_SCOPE = ['email', 'openid'];


// Cognito URL for identity provider authenticaton (e.g. Google)
// Pointing browser to this url will cause cognito to redirect
// to identity provider for authentication purposes
// identify provider returns credentials to cognito
// cognito then returns auth code to app as a url param
const COGNITO_ID_PROVIDER_URL = `https://${COGNITO_APP_DOMAIN}/oauth2/authorize?redirect_uri=${COGNITO_REDIRECT_URI}&response_type=code&client_id=${COGNITO_APP_ID}&identity_provider=${COGNITO_ID_PROVIDER}`;


export default {
  COGNITO_POOL_ID,
  COGNITO_APP_ID,
  COGNITO_APP_DOMAIN,
  COGNITO_REDIRECT_URI,
  COGNITO_SCOPE,
  COGNITO_ID_PROVIDER_URL
};
