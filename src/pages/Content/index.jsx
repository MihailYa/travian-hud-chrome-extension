import React from 'react';
import { render } from 'react-dom';
import './index.sass';
import App from './App';
import { TravianBuildingUpgraderProxy } from './travian/travianBuildingUpgraderProxy';
import { ReactApplicationLoader } from './react/reactApplicationLoader';

const reactApplicationLoader = new ReactApplicationLoader(
  () => {
    const root = document.createElement('div');
    root.id = 'travianHudRoot';
    document.body.innerHTML = '';
    document.body.appendChild(root);
    return root;
  },
  (root) => {
    render(<App />, root);
  });


const travianBuildingUpgraderProxy = new TravianBuildingUpgraderProxy();

reactApplicationLoader.addLoadCondition(travianBuildingUpgraderProxy.onPageLoaded);
reactApplicationLoader.addLoadCondition(() => true);

reactApplicationLoader.loadApplication();