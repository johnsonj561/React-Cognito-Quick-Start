import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Search from 'material-ui-icons/Search';

const inputStyle = {
  width: '100%'
};

const SearchInput = props => (
  <FormControl style={inputStyle}>
    <InputLabel htmlFor="search">Search</InputLabel>
    <Input
      type="text"
      onChange={event => props.onSearchChange(event)}
      endAdornment={
        <InputAdornment position="end">
          <IconButton>
            <Search />
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>
);

SearchInput.propTypes = {
  onSearchChange: PropTypes.func.isRequired
};


export default SearchInput;
