import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import SearchInput from '../../../inputs/SearchInput';
import Heading1 from '../../../typography/Heading1';
import './style.css';

const toolbarStyles = () => ({
  root: {
    padding: '10px 20px'
  }
});

const TableToolbar = (props) => {
  const {
    classes,
    handleSearchChange
  } = props;

  return (
    <Toolbar className={classes.root}>
      {/* Left Toolbar Items */}
      <div className="leftItem">
        <Heading1
          title="Todos Table"
          color="textSecondary"
        />
      </div>

      {/* Right Toolbar Items */}
      <div className="rightItem">
        <SearchInput onSearchChange={handleSearchChange} />
      </div>

    </Toolbar>
  );
};

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSearchChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
};

TableToolbar.defaultProps = {
  handleSearchChange: false
};

export default withStyles(toolbarStyles)(TableToolbar);

