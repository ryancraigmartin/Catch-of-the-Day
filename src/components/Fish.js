import React from "react";
import PropTypes from "prop-types"
import { formatPrice } from '../helpers';

class Fish extends React.Component {

  // .shape checks if the object that you are sending have these properties with these types.
  static PropTypes = {
    details:  PropTypes.shape({
      image: PropTypes.string, 
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func,
  }

  render() {

    // ES6 destructuring. Sets each individual detail to it's own variable.
    const {image, name, price, desc, status} = this.props.details;
    const isAvailable = status === 'available';

    return (
    <li className="menu-fish">
      <img src={image} alt={this.props.details.name}/>
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button onClick={() => this.props.addToOrder(this.props.index)} disabled={!isAvailable}>{isAvailable ? 'Add To Order' : 'SOLD OUT'}</button>
    </li>
    )
  }
}

export default Fish;
