import React, { Component } from 'react';
import { strings } from '../../../global/localization';
import { ParametrizedEvent } from '../../../utils/parametrizedEvent';
import { formatSeconds, formatTime } from '../../../utils/dateUtils';
import classNames from 'classnames';

class TimelineElement extends Component {
  onTimerEnd = new ParametrizedEvent();

  constructor(props) {
    super(props);

    this.state = {
      timeLeft: Math.round(this.props.endTime - Date.now() / 1000),
    };

    this.onTimerEnd.addEventListener(() => {
      console.log('Time ended');
    });
  }

  componentDidMount() {
    this.setUpTimer(this.props.endTime);
  }

  setUpTimer(endTime) {

    const timeLeftMillis = endTime * 1000 - Date.now();

    setTimeout(() => {
      this.setState({
        ...this.state,
        timeLeft: Math.round(endTime - Date.now() / 1000),
      });

      this.timer = setInterval(() => {
        let timeLeft = endTime - Date.now() / 1000;
        if (timeLeft <= 0.0001) {
          timeLeft = 0;
          this.onTimerEnd.broadcast();
          this.stopTimer();
        }
        this.setState({
          ...this.state,
          timeLeft: Math.round(timeLeft),
        });
      }, 1000);
    }, timeLeftMillis % 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  render() {
    const timelineElementClass = classNames('timelineElement', { 'endedTimer': this.state.timeLeft === 0 });
    const onLinkPressed = (event) => {
      this.props.onLinkPressed(event.currentTarget.getAttribute('data-href'));
    };
    return (
      <div className={timelineElementClass} onClick={onLinkPressed} data-href='#'>
        <table>
          <tbody>
          <tr>
            <td><img className="cargoImage" alt={strings.cargo} src={'/img/x.gif'} /></td>
            <td>{formatSeconds(this.state.timeLeft)}</td>
            <td>{formatTime(new Date(this.props.endTime * 1000))}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TimelineElement;