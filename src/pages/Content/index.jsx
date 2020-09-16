import React from 'react';
import { render } from 'react-dom';
import './index.sass'
import App from './App';

const root = document.createElement('div');
root.id = "travianHudRoot";
document.body.insertBefore(root, document.body.firstChild);

render(<App />, root);