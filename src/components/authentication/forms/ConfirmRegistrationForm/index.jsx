import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { TextField } from 'material-ui';
import Typography from 'material-ui/Typography';
import Validator from '../../../../utils/Validator';
import CognitoAuthorizer from '../../../../utils/CognitoAuthorizer';


const getDefaultState = () => ({
  formData: {
    confirmationCode: '',
  },
  formErrors: {},
  sendConfirmationText: 'Resend Confirmation'
});

const resentConfirmStyle = {
  cursor: 'pointer',
  color: '#337ab7',
  display: 'block',
  width: '100%',
  padding: '10px 0px 0px 0px',
  textAlign: 'center',
  background: 'none',
  border: 'none',
  outline: 'none'
};

const btnContainerStyle = {
  marginTop: 15,
  display: 'flex',
  justifyContent: 'space-between'
};

const btnStyle = {
  margin: '10px 0px',
  width: '45%'
};


class ConfirmRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = getDefaultState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resendConfirmation = this.resendConfirmation.bind(this);
  }

  handleInputChange({ target }) {
    this.props.clearErrors();
    const { id, value } = target;
    const { formData, formErrors } = this.state;
    formData[id] = value;
    formErrors[id] = Validator[id](value);
    this.setState({ formData, formErrors });
  }

  handleClose() {
    this.state = getDefaultState();
    this.props.handleClose();
  }

  handleSubmit() {
    const { formData, formErrors } = this.state;
    const { confirmationCode } = formData;
    let errorCount = 0;
    Object.keys(formData).forEach((key) => {
      formErrors[key] = Validator.getValidationError[key](formData[key]);
      errorCount += (formErrors[key]) ? 1 : 0;
    });
    if (!errorCount) {
      this.props.handleSubmit(confirmationCode);
    } else {
      this.setState({ formErrors });
    }
  }


  toggleConfirmationText(loading) {
    const sendConfirmationText = (loading) ? 'Sending...' : 'Resend Confirmation';
    this.setState({ sendConfirmationText });
  }


  resendConfirmation() {
    this.toggleConfirmationText(true);
    CognitoAuthorizer().resendConfirmationCode()
      .then(() => this.toggleConfirmationText());
  }


  render() {
    const { formData, formErrors, sendConfirmationText } = this.state;
    const { confirmationError, loading } = this.props;
    return (
      <React.Fragment>
        <Typography variant="title">Enter confirmation code</Typography>

        <TextField
          style={{ marginTop: 15 }}
          type="confirmationCode"
          id="confirmationCode"
          value={formData.confirmationCode}
          fullWidth
          autoFocus
          onChange={this.handleInputChange}
          error={!!(confirmationError || formErrors.confirmationCode)}
          helperText={confirmationError || formErrors.confirmationCode}
        />

        <div style={btnContainerStyle}>
          <Button
            onClick={this.handleClose}
            style={btnStyle}
            variant="raised"
            size="small"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleSubmit}
            style={btnStyle}
            variant="raised"
            size="small"
            disabled={loading}
          >
            Continue
          </Button>
        </div>

        <button
          onClick={this.resendConfirmation}
          style={resentConfirmStyle}
        >{sendConfirmationText}
        </button>

      </React.Fragment>
    );
  }
}

ConfirmRegistrationForm.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  confirmationError: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

ConfirmRegistrationForm.defaultProps = {
  loading: false,
  confirmationError: ''
};

export default ConfirmRegistrationForm;
