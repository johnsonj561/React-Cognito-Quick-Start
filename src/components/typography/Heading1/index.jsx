import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

const defaultStyle = {
  padding: '5px 0px'
};

const Heading1 = (props) => {
  const { rootStyle } = props;
  return (
    <div style={{ ...defaultStyle, ...rootStyle }}>
      <Typography
        variant="title"
        color={props.color}
      >
        {props.title}
      </Typography>
    </div>
  );
};

Heading1.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  rootStyle: PropTypes.object
};

Heading1.defaultProps = {
  title: '',
  color: 'textSecondary',
  rootStyle: {}
};

export default Heading1;
