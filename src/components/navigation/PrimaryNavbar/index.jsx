import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


const styles = {
  root: {
    margin: 0
  },
  typography: {
    color: '#fff'
  }
};

const getDefaultState = () => ({
  anchorEl: null
});

class PrimaryNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = getDefaultState();
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="title" className={classes.typography}>
            React Redux App
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

PrimaryNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimaryNavbar);
