import React from 'react'; // You will always need to import React into your components.

class StorePicker extends React.Component {
  render() {
    return (
        <form className="store-selector">
          {/* comment ! */}
          <h2>Please enter a Store</h2>
          <input type="text" placeholder="Enter store name"/>
          <button type="submit">Visit Store</button>
        </form>
    )
  }
}

export default StorePicker;