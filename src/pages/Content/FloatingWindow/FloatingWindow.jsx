import React, { Component } from 'react';
import './FloatingWindow.sass';

export default class FloatingWindow extends Component {
  state = {
    isDragging: false,
    mouseOffset: null,
    floatingWindowRef: React.createRef(),
  };

  onMouseDown(event) {
    const newState = Object.assign({}, this.state);
    newState.isDragging = true;

    const floatingDiv = this.state.floatingWindowRef.current;
    const divRect = floatingDiv.getBoundingClientRect();
    newState.mouseOffset = {
      x: event.pageX - divRect.left,
      y: event.pageY - divRect.top,
    };

    this.setState(newState);
  }

  onMouseUp(event) {
    const newState = Object.assign({}, this.state);
    newState.isDragging = false;
    newState.mouseOffset = null;
    this.setState(newState);
  }

  onMouseMove(event) {
    if (!this.state.isDragging)
      return;
    const floatingDiv = this.state.floatingWindowRef.current;
    floatingDiv.style.left = (event.pageX - this.state.mouseOffset.x) + 'px';
    floatingDiv.style.top = (event.pageY - this.state.mouseOffset.y) + 'px';
    event.preventDefault();
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  render() {
    return <div className="floatingWindow" ref={this.state.floatingWindowRef}>
      <div className="floatingWindowHandle" onMouseDown={this.onMouseDown.bind(this)}
           onMouseUp={this.onMouseUp.bind(this)} />
      <div className="floatingWindowContent">
        {this.props.children}
      </div>
    </div>;
  }
}