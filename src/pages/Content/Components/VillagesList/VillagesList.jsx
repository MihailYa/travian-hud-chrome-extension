import './VillagesList.sass';
import React, { Component } from 'react';
import VillageListRow from './VillageListRow';
import { connect } from 'react-redux';

class VillagesList extends Component {
  render() {
    const villagesComponents = this.props.villagesList.map((village) =>
      <VillageListRow village={village} key={village.villageIndex} onLinkPressed={this.props.onLinkPressed}/>
    );

    return <table className="villagesListTable">
      <tbody>
        {villagesComponents}
      </tbody>
    </table>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    villagesList: state.villages.villagesList,
  };
}

export default connect(mapStateToProps)(VillagesList)