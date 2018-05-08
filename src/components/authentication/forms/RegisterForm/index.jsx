import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { TextField } from 'material-ui';
import Typography from 'material-ui/Typography';
import getInputError from '../../../../utils/InputValidationUtil';
import './style.css';


const getDefaultState = () => ({
  formData: {
    email: '',
    password: '',
    password2: ''
  },
  formErrors: {}
});


class RegisterForm extends Component {
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
    this.props.handleClose();
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
    const { emailError, passwordError } = this.props;
    return (
      <React.Fragment>
        <Typography variant="title">Sign up with email</Typography>

        <TextField
          label="Email"
          type="email"
          id="email"
          value={formData.email}
          fullWidth
          autoFocus
          onChange={this.handleInputChange}
          error={!!(emailError || formErrors.email)}
          helperText={emailError || formErrors.email}
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
        />

        <TextField
          label="Confirm Password"
          type="password"
          id="password2"
          value={formData.password2}
          fullWidth
          onChange={this.handleInputChange}
          error={!!formErrors.password2}
          helperText={formErrors.password2}
        />

        <div className="email-btn-container">
          <Button
            onClick={this.handleSubmit}
            fullWidth
            className="login-form-btn"
            variant="raised"
            size="small"
          >
            Sign Up
          </Button>
          <Button
            onClick={this.handleClose}
            fullWidth
            className="login-form-btn"
            variant="raised"
            size="small"
          >
            Cancel
          </Button>
        </div>

      </React.Fragment>
    );
  }
}

RegisterForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  passwordError: PropTypes.string,
  emailError: PropTypes.string
};

RegisterForm.defaultProps = {
  passwordError: '',
  emailError: ''
};

export default RegisterForm;
