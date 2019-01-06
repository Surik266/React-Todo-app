import React, { Component } from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form/item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  constructor(){
    super();

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffe'),
        this.createTodoItem('Make awesome app'),
        this.createTodoItem('Pokushaw vkusno')
      ],
      term: ''
    }
  };

  onSearch = (items, term) => {

    if (term.length === 0) {
      return items;
    }

  const searchItems  = items.filter( task => ~task.label.toLowerCase().indexOf(term.toLowerCase()));
  return searchItems;

  }

  onSearchChange = (term) => {
    this.setState({
      term
    })
  }
  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {

    this.setState(({ todoData }) =>{

      const idx = todoData.findIndex((el) => el.id === id);

      const NewArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: NewArray
      }
    });

  };

  addItem = (text) => {

      const newItem = this.createTodoItem(text);

      this.setState(({ todoData }) =>{

        const NewArray = [
          ...todoData,newItem
        ];

        return {
          todoData: NewArray
        }

      });
  }

  toggleProperty(arr, id, propName){
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

     return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];

  }

  onToggleImportant = (id) => {

    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    })
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };

    })
  };

  render(){
    const { todoData, term } = this.state;

    const visibleItems = this.onSearch(todoData, term);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={ visibleItems }
          onDeleted={ this.deleteItem }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          />
        <ItemAddForm
          onAddItem={ this.addItem }/>
      </div>
    );

  }
};
