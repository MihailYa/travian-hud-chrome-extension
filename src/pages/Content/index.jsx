import React from 'react';
import { render } from 'react-dom';
import './index.sass'
import App from './App';


// document.body.parentNode.innerHTML = fs.readFileSync("index.html");
const root = document.createElement('div');
root.id = "travianHudRoot";
document.body.innerHTML = '';
document.body.appendChild(root);

render(<App />, root);