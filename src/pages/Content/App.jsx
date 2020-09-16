import React, { Component } from 'react';
import FloatingWindow from './FloatingWindow/FloatingWindow';

class App extends Component {
  render() {
    return (
      <FloatingWindow>
        <div className="app">
          Some draggable
          content
        </div>
      </FloatingWindow>
    );
  }
}

export default App;
