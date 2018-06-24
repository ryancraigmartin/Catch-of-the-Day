import React from 'react'; // You will always need to import React into your components.
import { getFunName } from "../helpers";
import PropTypes from "prop-types"


class StorePicker extends React.Component {

  static PropTypes = {
    history: PropTypes.object
  }

  // Property on the component made into a ref.
  storeName = React.createRef();

  // goToStore is a property of the component set to an arrow function that binds THIS to the StorePicker component.
  goToStore = event => {
    event.preventDefault();
    // current will need to change back to value later.
    const storeNameValue = this.storeName.current.value; 
    // Changes the page based on what the user types in.
    this.props.history.push(`/store/${storeNameValue}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a Store</h2>
        <input 
          ref={this.storeName} 
          defaultValue={getFunName()} 
          type="text" 
          placeholder="Enter store name" 
        />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

export default StorePicker;