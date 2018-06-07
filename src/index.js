import React from 'react'; 
import { render } from 'react-dom'; // Allows for rendering to the DOM.
import StorePicker from './components/StorePicker';
import App from './components/App';
import "./css/style.css"; // Imports css styles for the whole application. 



render(<App/>, document.querySelector('#main'));