import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

  constructor(){
    super();
    this.state = {
      label: ''
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAddItem(this.state.label);
    this.setState({
      label: ''
    });
  };

  render() {
      return (
        <form className="item-add-form d-flex"
              onSubmit={this.onSubmit}>
          <input type="text" className='form-control'
                  placeholder="Whats needs to be done"
                  onChange={this.onLabelChange}
                  value={this.state.label}/>
                <button className="btn btn-outline-secondary">Add Item</button>
      </form>
    )
  }
}
