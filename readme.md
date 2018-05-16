## React / Redux & AWS Cognito Starter App

I wanted an authentication UI that could be dropped into any new React app.

I did not want to continue using the hosted UI provided by Cognito.

So I created a react component, AuthenticationDialog, that wraps any React app with an authentication layer.
```jsx
import AuthenticationDialog from './components/authentication/AuthenticationDialog';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }

  render() {
    return (
      <AuthenticationDialog>
        <AppRouter />
      </AuthenticationDialog>
    );
  }
}
```

Combined with a helper class, CognitoAuthorizer, the AuthenticationDialog will:
- check browser's local storage for valid session
- display login dialog if no session is found, prompting user to sign in
- provide registration, confirm registration, forgot password, and sign in flows
- allow for 3rd party auth (currently Google)
- automatically use refresh token to fetch new accessTokens before they expire
- pass an instance of CognitoAuthorizer to child component via props - providing session details and auth methods to the App


The CognitoAuthorizer class (src/utils/CognitoAuthorizer) abstracts out a lot of the Cognito logic. It uses amazon-cognito-identity-js and amazon-cognito-auth-js packages to interface with AWS.


I was working on a project that was using Material-UI at the time of writing this, and I do not have time to remove that dependency and re-style the dialo right now.


Future Work (maybe when school semester is over in August '18?):
- remove the Material-UI dependency and style everything myself
- add forms for editing profiles
- create AWS cloud formation template to automate the Cognito deployment
- come up with a cooler name ...
- minimize dependecies, document, and package up as npm component that others can use :)
