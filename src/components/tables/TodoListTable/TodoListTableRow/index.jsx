import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from 'material-ui/Table';
import SuccessIcon from '../../../icons/SuccessIcon';


const statusIcons = {
  complete: () => <SuccessIcon />,
  pending: () => <SuccessIcon />
};

class TodoListTableRow extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
  }


  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { todoItem } = this.props;
    console.log(todoItem);
  }

  render() {
    const { todoItem, onRowClick } = this.props;
    const { status, name, createDateString } = todoItem;
    console.log(status);
    return (
      <TableRow hover onClick={() => onRowClick(todoItem)}>

        <TableCell>{statusIcons[status]()}</TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{createDateString}</TableCell>

      </TableRow>
    );
  }
}


TodoListTableRow.propTypes = {
  todoItem: PropTypes.object.isRequired,
  onRowClick: PropTypes.func.isRequired
};

export default TodoListTableRow;
