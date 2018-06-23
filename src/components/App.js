import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";

class App extends React.Component {

  state = {
    fishes: {},
    order: {}
  };

  addFish = fish => {
    // 1. Makes a copy of the existing state using an object spread.
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to the new fishes variable and gives it a time stamp.
    fishes[`fish${Date.now()}`] = fish; 
    // 3. Set the new fishes object to state.
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
           {/* Passing the addFish method to the Inventory component. */}
        <Inventory 
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
