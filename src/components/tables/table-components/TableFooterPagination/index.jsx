import React from 'react';
import PropTypes from 'prop-types';
import { TableFooter, TablePagination, TableRow } from 'material-ui/Table';

const TableFooterPagination = (props) => {
  const {
    colSpan,
    count,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage
  } = props;

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          colSpan={colSpan}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableRow>
    </TableFooter>
  );
};

TableFooterPagination.propTypes = {
  colSpan: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired
};

export default TableFooterPagination;
