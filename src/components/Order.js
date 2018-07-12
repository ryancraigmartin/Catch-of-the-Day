import React from "react";
import PropTypes from "prop-types"
import { formatPrice } from "../helpers"
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {

  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const quantity = this.props.order[key];
    const isAvailable = fish && fish.status === 'available'   
    
    const transitionOptions = {
      classNames:"order",
      key: key, 
      timeout: {enter: 500, exit: 500}
    } 

    // If fish are not yet loaded, don't send any information to the Order component.
    if (!fish) return null;

    if (!isAvailable) {
      return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          Sorry {fish ? fish.name : "fish"} is no longer available 
        </li>
      </CSSTransition>
      )
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
          <TransitionGroup component="span" classNames="count">
            <CSSTransition classNames="count" key={quantity} timeout={{enter: 500, exit: 500}}>
              <span>{quantity}</span>
            </CSSTransition>
          </TransitionGroup>  
            lbs {fish.name}
            {formatPrice(quantity * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {

    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const quantity = this.props.order[key];
      const isAvailable = fish && fish.status === 'available'

      if (isAvailable) {
        return prevTotal + (quantity * fish.price);
      }
    return prevTotal;
    }, 0); 

    return (
    <div className="order-wrap">
      <h2>Order</h2>
      <TransitionGroup component="ul" className='order'>
        {orderIds.map(this.renderOrder)}
      </TransitionGroup>
          <div className="total">
            Total:
            <strong>{formatPrice(total)}</strong>
          </div>
    </div>
    )
  }
}

Order.PropTypes = {
  fishes: PropTypes.object.isRequired,
  order:  PropTypes.object.isRequired,
  removeFromOrder: PropTypes.func.isRequired
}

export default Order;
