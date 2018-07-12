import React from "react";
import PropTypes from "prop-types"

class EditFishForm extends React.Component {

  // When something changes on the input this function is called which takes the value and updates the field.
  handleChange = event => {
    // Update a fish
    // 1. Take a copy of the current fish.
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateFish(this.props.index, updatedFish);
  }

  render() {
    return (
      <div className="fish-edit">
        <input type='text' name='name' onChange={this.handleChange} value={this.props.fish.name} />
        <input type='text' name='price' onChange={this.handleChange} value={this.props.fish.price} />
        <select type='text' name='status' onChange={this.handleChange} value={this.props.fish.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type='text' name='desc' onChange={this.handleChange} value={this.props.fish.desc} />
        <input type="text" name='image' onChange={this.handleChange} value={this.props.fish.image} />
        <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>

    )
  }
}

EditFishForm.PropTypes = {
  fish: PropTypes.shape
    ({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }),
  index: PropTypes.string.isRequired,
  updateFish: PropTypes.func.isRequired
};

export default EditFishForm;