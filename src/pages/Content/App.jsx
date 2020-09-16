import React, { Component } from 'react';
import FloatingWindow from './FloatingWindow/FloatingWindow';

class App extends Component {
  floatingWindowRef = React.createRef();

  onIframeLoad() {
    const iFrame = this.floatingWindowRef.current;
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight + "px";
  }

  render() {
    return (
      <div className="appRoot">
        <FloatingWindow>
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
