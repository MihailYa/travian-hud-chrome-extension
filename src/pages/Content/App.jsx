import React, { Component } from 'react';
import FloatingWindow from './FloatingWindow/FloatingWindow';

class App extends Component {
  render() {
    return (
      <div className="appRoot">
        <FloatingWindow componentId="villagesList">
          <div>
            Some draggable
            content
          </div>
        </FloatingWindow>
      </div>
    );
  }
}

export default App;
