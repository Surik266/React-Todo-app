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
        { label: 'Drink Coffee', important: false, id: 1 },
        { label: 'Make Awesome App', important: true, id: 2 },
        { label: 'Have a lunch', important: false, id: 3 }
      ]
    }
  };

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

      const newItem = {
        label: text,
        important: false,
        id: this.maxId++
      };

      this.setState(({ todoData }) =>{

        const NewArray = [
          ...todoData,newItem
        ];

        return {
          todoData: NewArray
        }

      });
  }

  render(){

    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={this.state.todoData}
          onDeleted={ this.deleteItem }
          />
        <ItemAddForm
          onAddItem={ this.addItem }/>
      </div>
    );

  }
};
