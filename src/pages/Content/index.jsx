import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import './index.sass';
import App from './App';
import { ReactApplicationLoader } from './react/reactApplicationLoader';
import log from 'loglevel'
import store from './reduxStore/store'

log.setLevel('trace');

const reactApplicationLoader = new ReactApplicationLoader(
  () => {
    const root = document.createElement('div');
    root.id = 'travianHudRoot';
    document.body.innerHTML = '';
    document.body.appendChild(root);
    return root;
  },
  (root) => {
    render(
      <Provider store={store}>
        <App />
      </Provider>, root);
  },
  () => {
    // Travian crypt system fix
    const htmlScriptElement = window.document.createElement('script');
    htmlScriptElement.innerHTML =
      'const travianIFrame = document.getElementsByClassName(\'travianIframe\')[0];\n' +
      'const key = window.Travian.nonvotingUnsheathingCommunicating;\n' +
      'travianIFrame.onload = () => {\n' +
      '   travianIFrame.contentWindow.Travian.nonvotingUnsheathingCommunicating = key;  \n' +
      '}';
    window.document.head.appendChild(htmlScriptElement);
  });

reactApplicationLoader.addLoadCondition(() => true);

reactApplicationLoader.loadApplication();