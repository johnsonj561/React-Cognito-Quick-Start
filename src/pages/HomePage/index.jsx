import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoListTable from '../../components/tables/TodoListTable';
import DateUtil from '../../utils/DateUtil';
import SortingUtil from '../../utils/SortingUtil';
import SearchUtil from '../../utils/SearchUtil';
import { fetchTodos } from '../../redux/actions/todo-actions';

const pageStyle = {
  padding: 20
};

const searchProps = ['name', 'description', 'createDateString'];

const defaultState = {
  filteredData: [],
  orderBy: 'createDate',
  sortType: 'date',
  activeTodo: undefined
};


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
    this.toggleSpinner = this.toggleSpinner.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }


  componentDidMount() {
    this.props.fetchTodos();
  }

  componentWillReceiveProps(nextProps) {
    const { todoList } = nextProps;
    if (this.props.todoList !== todoList) {
      const { orderBy, sortType } = this.state;
      this.handleRequestSort(todoList, orderBy, sortType);
    }
  }


  toggleSpinner(spinnerText) {
    this.setState({ spinnerText });
  }


  handleRequestSort(list, orderBy, sortType, reverse) {
    const data = DateUtil.addCreateDateStrings(list);
    const filteredData = SortingUtil.sortData(data, orderBy, sortType, reverse);
    this.setState({ filteredData, orderBy });
  }


  updateSelected(selected) {
    this.setState({ selected });
  }

  handleSearchClick({ target }) {
    const { value } = target;
    const { todoList } = this.props;
    const filteredData = SearchUtil.searchObjectList(todoList, searchProps, value);
    this.setState({ filteredData });
  }

  createTodo(newTodo) {
    console.log('create new todo', newTodo, this.state);
  }

  handleRowClick(selected) {
    console.log('row clicked', selected, this.state);
  }

  render() {
    const {
      filteredData,
      selected,
      spinnerText,
      orderBy
    } = this.state;
    return (
      <div style={pageStyle}>
        <TodoListTable
          data={filteredData}
          selected={selected}
          spinnerText={spinnerText}
          orderBy={orderBy}
          handleRequestSort={this.handleRequestSort}
          updateSelected={this.updateSelected}
          handleDeleteItem={this.handleDeleteItem}
          handleSearchClick={this.handleSearchClick}
          handleRowClick={this.handleRowClick}
        />
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  todoList: state.todos.todos
});

HomePage.propTypes = {
  todoList: PropTypes.array,
  fetchTodos: PropTypes.func.isRequired
};

HomePage.defaultProps = {
  todoList: []
};

export default connect(mapStatetoProps, { fetchTodos })(HomePage);
