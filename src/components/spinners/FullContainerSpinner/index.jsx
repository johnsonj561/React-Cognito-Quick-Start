import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';

const spinnerContainerStyle = {
  textAlign: 'center'
};

const spinnerOverlayStyle = {
  backgroundColor: '#ccc',
  width: '100%',
  height: '100%',
  opacity: '0.8',
  position: 'absolute',
  zIndex: 10
};

const spinnerStyle = {
  position: 'absolute',
  zIndex: 20,
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

const spinnerTextStyle = {
  position: 'absolute',
  zIndex: 20,
  top: '60%',
  left: '50%',
  transform: 'translateX(-50%)',
  fontFamily: 'sans-serif',
  fontSize: '1.5em'
};

const FullContainerSpinner = props => (
  <div style={spinnerContainerStyle}>
    <div style={spinnerOverlayStyle} />
    <div style={spinnerStyle}><CircularProgress size={100} thickness={3} /></div>
    <span style={spinnerTextStyle}>{props.spinnerText}</span>
  </div>
);

FullContainerSpinner.propTypes = {
  spinnerText: PropTypes.string
};

FullContainerSpinner.defaultProps = {
  spinnerText: ''
};

export default FullContainerSpinner;
