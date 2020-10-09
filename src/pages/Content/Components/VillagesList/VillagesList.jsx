import './VillagesList.sass';
import React, { Component } from 'react';
import VillageListRow from './VillageListRow';
import { connect } from 'react-redux';
import Timeline from './timeline/Timeline';

class VillagesList extends Component {
  render() {
    const villagesComponents = this.props.villagesList.map((village) =>
      <VillageListRow village={village} key={village.villageIndex} onLinkPressed={this.props.onLinkPressed} />,
    );

    return (
      <div>
        <table className="villagesListTable">
          <tbody>
          {villagesComponents}
          </tbody>
        </table>
        <div style={{position: 'relative', display: 'inline-block', verticalAlign: 'top'}}><Timeline /></div>

      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    villagesList: state.villages.villagesList,
  };
}

export default connect(mapStateToProps)(VillagesList);