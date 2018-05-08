import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PageRoot from '../../pages/PageRoot';
import HomePage from '../../pages/HomePage';

const AppRouter = (props) => {
  const { currentUser, cognitoAuthorizer } = props;
  return (
    <Router>
      <React.Fragment>

        {/* Page Root - Rendered at all times (navbar, loading panel, alerts, etc) */}
        <Route
          path="/"
          render={() => (
            <PageRoot />
          )}
        />

        {/* Page Routing */}
        <Switch>
          {/* Redirect root to workbench */}
          <Redirect exact from="/" to="/home" />

          {/* Home Page */}
          <Route
            exact
            path="/home"
            render={() =>
              <HomePage currentUser={currentUser} cognitoAuthorizer={cognitoAuthorizer} />}
          />

          {/* 404 */}
          <Route component={HomePage} />

        </Switch>
      </React.Fragment>
    </Router>
  );
};

AppRouter.propTypes = {
  cognitoAuthorizer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  currentUser: PropTypes.string
};

AppRouter.defaultProps = {
  cognitoAuthorizer: false,
  currentUser: ''
};

export default AppRouter;
