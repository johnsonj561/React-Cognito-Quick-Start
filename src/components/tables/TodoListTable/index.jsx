import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import Table, { TableBody } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import SortableTableHeader from '../table-components/SortableTableHeader';
import TableToolbar from '../table-components/TableToolbar';
import TodoListTableRow from './TodoListTableRow';
import TableFooterPagination from '../table-components/TableFooterPagination';

const columnConfig = [
  {
    id: 'status', numeric: false, disablePadding: false, label: 'Status', sortType: 'string'
  },
  {
    id: 'name', numeric: false, disablePadding: false, label: 'Name', sortType: 'string'
  },
  {
    id: 'createDate', numeric: false, disablePadding: false, label: 'Date Created', sortType: 'date'
  }
];

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 200
  },
  tableWrapper: {
    overflowX: 'auto',
    padding: 10
  }
});

const defaultState = {
  order: 'desc',
  page: 0,
  rowsPerPage: 5
};

class TodoListTable extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }


  handleRequestSort = (property, sortType) => {
    if (!sortType) {
      return;
    }
    let order = 'desc';
    if (this.props.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    const reverse = (order === 'desc');
    this.setState({ order });
    this.props.handleRequestSort(this.props.data, property, sortType, reverse);
  };


  handleSelectAllClick = (event, checked) => ((checked) ?
    this.props.updateSelected(this.props.data.map(testRun => testRun.testId)) :
    this.props.updateSelected()
  );


  handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    const { selected } = this.props;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.props.updateSelected(newSelected);
  };


  handleChangePage = (event, page) => {
    this.setState({ page });
  };


  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };


  isSelected = (id) => {
    const { selected } = this.props;
    return selected.indexOf(id) !== -1;
  };


  render() {
    const {
      order,
      rowsPerPage,
      page
    } = this.state;

    const {
      classes,
      data,
      selected,
      orderBy,
      handleSearchClick,
      handleRowClick,
    } = this.props;

    return (
      <Paper className={this.props.classes.root}>

        {/* Toolbar - provides search and delete functionality */}
        <TableToolbar
          numSelected={selected.length}
          handleSearchChange={handleSearchClick}
        />


        <div className={classes.tableWrapper}>

          <Table className={classes.table}>


            {/* Header with sort functionality */}
            <SortableTableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              columnData={columnConfig}
            />


            {/* Body content */}
            <TableBody>
              {data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                .map((todoItem) => {
                  const isSelected = this.isSelected(todoItem.id);
                  return (
                    <TodoListTableRow
                      key={todoItem.id}
                      todoItem={todoItem}
                      isSelected={isSelected}
                      onCheckboxClick={this.handleCheckboxClick}
                      onRowClick={handleRowClick}
                    />
                  );
              })}

            </TableBody>


            {/* Footer provides pagination */}
            <TableFooterPagination
              colSpan={columnConfig.length + 1}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              handleChangePage={this.handleChangePage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            />

          </Table>
        </div>
      </Paper>
    );
  }
}

TodoListTable.propTypes = {
  classes: PropTypes.object.isRequired,
  handleRowClick: PropTypes.func.isRequired,
  data: PropTypes.array,
  selected: PropTypes.array,
  orderBy: PropTypes.string,
  handleRequestSort: PropTypes.func.isRequired,
  updateSelected: PropTypes.func.isRequired,
  handleSearchClick: PropTypes.func.isRequired
};

TodoListTable.defaultProps = {
  data: [],
  selected: [],
  orderBy: 'createDate'
};

export default withStyles(styles)(withRouter(TodoListTable));
