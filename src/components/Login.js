import React from "react";
import PropTypes from "prop-types"


const Login = (props) => (
  <nav classNam="login">
    <h2>Inventory login</h2>
    <p>Sign in to manage your store's inventory.</p>
    <button className="github" onClick={() => props.authenticate("Github")}>
      Log In With Github
    </button>
    <button className="facebook" onClick={() => props.authenticate("Facebook")}>
    Log In With Facebook
    </button>
  </nav>
);

Login.PropTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;