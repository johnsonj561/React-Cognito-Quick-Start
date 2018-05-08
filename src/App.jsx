import React, { Component } from 'react';
import AppRouter from './routes/AppRouter';
import AuthenticationDialog from './components/authentication/AuthenticationDialog';

const defaultState = {
  session: false
};


/**
 * Main App Component
 */
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

export default App;
