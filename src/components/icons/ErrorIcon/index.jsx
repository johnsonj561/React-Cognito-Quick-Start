import React from 'react';
import PropTypes from 'prop-types';
import Error from 'material-ui-icons/Error';
import Tooltip from 'material-ui/Tooltip';

const sizeMap = {
  small: { width: 20, height: 20 },
  medium: { width: 30, height: 30 },
  large: { width: 40, height: 40 },
};

const getIconStyle = (rootStyles, size = {}) => ({
  ...rootStyles,
  ...sizeMap[size]
});

const ErrorIcon = (props) => {
  const {
    rootStyle, size, tooltip, tooltipPlacement
  } = props;
  const iconStyles = getIconStyle(rootStyle, size);
  return (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
      <Error style={iconStyles} />
    </Tooltip>
  );
};

ErrorIcon.propTypes = {
  rootStyle: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  tooltip: PropTypes.string,
  tooltipPlacement: PropTypes.string
};

ErrorIcon.defaultProps = {
  rootStyle: {},
  size: 'small',
  tooltip: '',
  tooltipPlacement: 'top'
};

export default ErrorIcon;
