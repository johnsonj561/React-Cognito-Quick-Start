import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
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

const SpinnerIcon = (props) => {
  const {
    rootStyle, size, tooltip, tooltipPlacement
  } = props;
  const iconStyles = getIconStyle(rootStyle, size);
  return (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
      <CircularProgress style={iconStyles} />
    </Tooltip>
  );
};

SpinnerIcon.propTypes = {
  rootStyle: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  tooltip: PropTypes.string,
  tooltipPlacement: PropTypes.string
};

SpinnerIcon.defaultProps = {
  rootStyle: {},
  size: 'small',
  tooltip: '',
  tooltipPlacement: 'top'
};

export default SpinnerIcon;
