import React from 'react';
import PropTypes from 'prop-types';
import Done from 'material-ui-icons/Done';
import Tooltip from 'material-ui/Tooltip';
import green from 'material-ui/colors/green';

const sizeMap = {
  small: { width: 20, height: 20 },
  medium: { width: 30, height: 30 },
  large: { width: 40, height: 40 },
};

const getIconStyle = (rootStyles, size = {}) => ({
  color: green[500],
  ...rootStyles,
  ...sizeMap[size]
});

const SuccessIcon = (props) => {
  const {
    rootStyle, size, tooltip, tooltipPlacement
  } = props;
  const iconStyles = getIconStyle(rootStyle, size);
  return (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
      <Done style={iconStyles} />
    </Tooltip>
  );
};

SuccessIcon.propTypes = {
  rootStyle: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  tooltip: PropTypes.string,
  tooltipPlacement: PropTypes.string
};

SuccessIcon.defaultProps = {
  rootStyle: {},
  size: 'small',
  tooltip: '',
  tooltipPlacement: 'top'
};

export default SuccessIcon;
