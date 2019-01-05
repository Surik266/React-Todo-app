import React from 'react';

import './item-add-form.css';

const ItemAddForm = ( {onAddItem} ) => {

  return (
    <div className="item-add-form">
      <button onClick={() => onAddItem('Hello world')}
      className="btn btn-outline-secondary">Add Item</button>
    </div>
  )
}

export default ItemAddForm;
