import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const HorizontalDividerWithText = props => (
  <span className="horizontal-divider"><span>{props.text}</span></span>
);

HorizontalDividerWithText.propTypes = {
  text: PropTypes.string
};

HorizontalDividerWithText.defaultProps = {
  text: ''
};
export default HorizontalDividerWithText;
