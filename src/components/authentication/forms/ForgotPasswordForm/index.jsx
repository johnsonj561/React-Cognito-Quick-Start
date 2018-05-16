import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { TextField } from 'material-ui';
import Typography from 'material-ui/Typography';
import Validator from '../../../../utils/Validator';
import './style.css';


const getDefaultState = () => ({
  formData: {
    email: '',
    confirmationCode: '',
    password: '',
    password2: ''
  },
  formErrors: {}
});

const btnContainerStyle = {
  marginTop: 15,
};

const btnStyle = {
  margin: '5px 0px'
};


class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = getDefaultState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewPasswordRequest = this.handleNewPasswordRequest.bind(this);
  }


  handleInputChange({ target }) {
    this.props.clearErrors();
    const { id, value } = target;
    const { formData, formErrors } = this.state;
    formData[id] = value;
    formErrors[id] = Validator.getValidationError[id](value);
    this.setState({ formData, formErrors });
  }


  handleNewPasswordRequest() {
    const { formData, formErrors } = this.state;
    const { email } = formData;
    formErrors.email = Validator.getValidationError.email(email);
    if (formErrors.email) {
      this.setState({ formErrors });
    } else {
      this.props.handleNewPasswordRequest(email);
    }
  }


  handleSubmit() {
    const { formData, formErrors } = this.state;
    let errorCount = 0;
    Object.keys(formData).forEach((key) => {
      formErrors[key] = Validator.getValidationError[key](formData[key]);
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
      handleClose,
      emailError,
      passwordError,
      confirmationError,
      loading,
      passwordCodeRequested
    } = this.props;

    return (
      <React.Fragment>
        {/* Request confirmation code */}
        {!passwordCodeRequested &&
          <React.Fragment>
            <Typography variant="title">Reset Password</Typography>
            <TextField
              label="Enter Email"
              type="email"
              id="email"
              value={formData.email}
              fullWidth
              onChange={this.handleInputChange}
              error={!!(emailError || formErrors.email)}
              helperText={emailError || formErrors.email}
            />
            <div style={btnContainerStyle}>
              <Button
                onClick={this.handleNewPasswordRequest}
                fullWidth
                style={btnStyle}
                variant="raised"
                size="small"
                disabled={loading}
              >
                Reset Password
              </Button>
              <Button
                onClick={handleClose}
                fullWidth
                style={btnStyle}
                variant="raised"
                size="small"
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </React.Fragment>
        }


        {/* Enter confirmation code and new password */}
        {!!passwordCodeRequested &&
          <React.Fragment>
            <Typography variant="title">New Password</Typography>
            <TextField
              label="Reset Code"
              type="text"
              id="confirmationCode"
              value={formData.confirmationCode}
              fullWidth
              onChange={this.handleInputChange}
              error={!!(confirmationError || formErrors.confirmationCode)}
              helperText={confirmationError || formErrors.confirmationCode}
            />
            <TextField
              label="New Password"
              type="password"
              id="password"
              value={formData.password}
              fullWidth
              onChange={this.handleInputChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
            <TextField
              label="Confirm Password"
              type="password"
              id="password2"
              value={formData.password2}
              fullWidth
              onChange={this.handleInputChange}
              error={!!(passwordError || formErrors.password2)}
              helperText={passwordError || formErrors.password2}
            />

            <div style={btnContainerStyle}>
              <Button
                onClick={this.handleSubmit}
                fullWidth
                style={btnStyle}
                variant="raised"
                size="small"
                disabled={loading}
              >
                Submit
              </Button>
              <Button
                onClick={handleClose}
                fullWidth
                style={btnStyle}
                variant="raised"
                size="small"
                disabled={loading}
              >
                Cancel
              </Button>
            </div>

          </React.Fragment>
        }

      </React.Fragment>
    );
  }
}

ForgotPasswordForm.propTypes = {
  handleNewPasswordRequest: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  passwordCodeRequested: PropTypes.bool,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
  confirmationError: PropTypes.string,
};

ForgotPasswordForm.defaultProps = {
  emailError: '',
  passwordError: '',
  confirmationError: '',
  loading: false,
  passwordCodeRequested: false
};

export default ForgotPasswordForm;
