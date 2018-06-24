import React from "react";
import PropTypes from "prop-types"
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish"; 
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {

  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  }

  // This life- cycle method syncs the state of the data to Firebase.
  componentDidMount() {
    const { params } = this.props.match;
    // First reinstate our localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    console.log(this.state.order)
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  // This life-cycle method triggers an unmount.  
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Makes a copy of the existing state using an object spread.
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to the new fishes variable and gives it a time stamp.
    fishes[`fish${Date.now()}`] = fish; 
    // 3. Set the new fishes object to state.
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. Makes a copy of the existing state using an object spread.
    const fishes = {...this.state.fishes};
    // 2. Update the state.
    fishes[key] = updatedFish;
    // 3. Set the state.
    this.setState({fishes});
  }

  deleteFish = (key) => {
    // 1. Take a copy of the state.
    const fishes = {...this.state.fishes}
    // 2. Update the state. Set the fish that we no longer want to null.
    fishes[key] = null;
    this.setState({fishes});
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder = key => {
    // 1. Take a copy of the state.
    const order = {...this.state.order}
    // 2. Either add to the order or update the number in our order.
    order[key] = order[key] + 1 || 1;
    // 3. Call set state to update the state object.
    this.setState({ order });
  }

  removeFromOrder = key => {
    // 1. Take a copy of the state.
    const order = {...this.state.order}
    // 2. Remove the item from the order.
    delete order[key]; 
    // 3. Call set state to update the state object.
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map( key => 
            <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}          
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
           {/* Passing the addFish method to the Inventory component. */}
        <Inventory 
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
