import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CustomTheme from './themes/CustomTheme';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './styles/style.css';
import store from './redux/store';

/**
 * Wrap App With Material Theme Provider
 */
const AppWrapper = () => (
  <MuiThemeProvider theme={CustomTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
);


/**
 * Render App to DOM
 */
ReactDOM.render(<AppWrapper />, document.getElementById('root'));
registerServiceWorker();
