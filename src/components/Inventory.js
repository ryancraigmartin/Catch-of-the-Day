import React from "react";
import PropTypes from "prop-types"
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component { 

  state = {
    uid: null,
    owner: null
  }

  // Will log you back in if previously signed in before refresh takes place.
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({user});
      }
    })
  }

  authHandler = async (authData) => {
    // 1. Look up the current store in the Firebase database.
    const store = await base.fetch(this.props.storeId, {context: this})
    console.log(store)
    // 2. Claim it if there isn't already an owner of the store and set the uid as part of the owner property.
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid // Part of the user payload received upon authentication.
      })
    }
    // 3. Set the sate of the inventory to reflect the current user.
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
    console.log(authData)

  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider)
    .then(this.authHandler)
  }

  logout = async () => {
    console.log('logout!')
    await firebase.auth().signOut();
    this.setState({uid: null})
  }

  render() {

    const logout = <button onClick={this.logout}>Log Out</button>

    // 1. Check if the user is currently logged in.
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate}/>
    }

    // 2. Check if they are not the owner of the store.
    if (this.state.uid !== this.state.owner) {
      return (
      <div>   
        <p>Sorry! You're not the owner of this store.</p>
        {logout} 
      </div>
      )
    }

    // If they are the owner, render the inventory.
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}         
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm 
            key={key} 
            index={key} 
            fish={this.props.fishes[key]} 
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

Inventory.PropTypes = {
  fishes:  PropTypes.object,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  loadSampleFishes: PropTypes.func
}

export default Inventory;
