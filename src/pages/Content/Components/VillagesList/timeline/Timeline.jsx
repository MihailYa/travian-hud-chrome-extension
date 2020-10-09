import './Timeline.sass'
import React, { Component } from 'react';
import TimelineElement from './TimelineElement';

class Timeline extends Component {
  render() {
    return (
      <div className="timeline">
            <TimelineElement endTime={(Date.now() + 1000)/1000}/>
            <TimelineElement endTime={(Date.now() + 100000)/1000}/>
      </div>
    );
  }
}

export default Timeline;