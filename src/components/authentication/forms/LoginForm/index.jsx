import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { TextField } from 'material-ui';
import Typography from 'material-ui/Typography';
import HorizontalDividerWithText from '../../../dividers/HorizontalDividerWithText';
import getInputError from '../../../../utils/InputValidationUtil';
import './style.css';


const getDefaultState = () => ({
  formData: {
    email: '',
    password: ''
  },
  formErrors: {}
});

const forgotPasswordStyle = {
  cursor: 'pointer',
  color: '#337ab7',
  display: 'block',
  width: '100%',
  padding: '10px 0px',
  textAlign: 'left',
  background: 'none',
  border: 'none',
  outline: 'none'
};


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = getDefaultState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange({ target }) {
    this.props.clearErrors();
    const { id, value } = target;
    const { formData, formErrors } = this.state;
    formData[id] = value;
    formErrors[id] = getInputError[id](value);
    this.setState({ formData, formErrors });
  }


  handleClose() {
    this.state = getDefaultState();
  }


  handleSubmit() {
    const { formData, formErrors } = this.state;
    let errorCount = 0;
    Object.keys(formData).forEach((key) => {
      formErrors[key] = getInputError[key](formData[key]);
      errorCount += (formErrors[key]) ? 1 : 0;
    });
    if (!errorCount) {
      this.props.handleSubmit(formData);
    } else {
      this.setState({ formErrors });
    }
  }


  render() {
    const { formData, formErrors } = this.state;
    const {
      emailError,
      passwordError,
      loading,
      handleForgotPassword,
      handleGoogleAuthClick
    } = this.props;
    return (
      <React.Fragment>
        <Typography variant="title">Sign in with email</Typography>

        <TextField
          label="Email"
          type="email"
          id="email"
          value={formData.email}
          fullWidth
          onChange={this.handleInputChange}
          error={!!(emailError || formErrors.email)}
          helperText={emailError || formErrors.email}
          disabled={loading}
        />

        <TextField
          label="Password"
          type="password"
          id="password"
          value={formData.password}
          fullWidth
          onChange={this.handleInputChange}
          error={!!(passwordError || formErrors.password)}
          helperText={passwordError || formErrors.password}
          disabled={loading}
        />

        <button
          style={forgotPasswordStyle}
          onClick={handleForgotPassword}
        >Forgot Password?
        </button>

        <div className="email-btn-container">
          <Button
            onClick={this.handleSubmit}
            fullWidth
            className="login-form-btn"
            variant="raised"
            size="small"
            disabled={loading}
          >
            Sign In
          </Button>
          <Button
            onClick={this.props.handleRegisterClick}
            fullWidth
            className="login-form-btn"
            variant="raised"
            size="small"
            disabled={loading}
          >
            Register New Email
          </Button>
        </div>

        <HorizontalDividerWithText text="OR" />

        {/* Bottom Half - FB/Google */}
        <Typography variant="title">Sign in with social account</Typography>
        <div className="social-btn-container">
          <Button
            style={{ backgroundColor: '#db3236', color: 'white' }}
            fullWidth
            className="login-form-btn"
            variant="raised"
            size="small"
            disabled={loading}
            onClick={handleGoogleAuthClick}
          >
            Continue with Google
          </Button>
        </div>

      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  handleForgotPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleRegisterClick: PropTypes.func.isRequired,
  handleGoogleAuthClick: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  emailError: PropTypes.string,
  passwordError: PropTypes.string
};

LoginForm.defaultProps = {
  emailError: '',
  passwordError: '',
  loading: false
};

export default LoginForm;
