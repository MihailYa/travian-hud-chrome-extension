import './VillagesList.sass';
import React, { Component } from 'react';
import VillageListRow from './VillageListRow';

export default class VillagesList extends Component {
  render() {
    const villagesComponents = this.props.villagesList.map((village) =>
      <VillageListRow village={village} key={village.villageIndex}/>
    );

    console.log(villagesComponents);
    return <table className="villagesListTable">
      <tbody>
        {villagesComponents}
      </tbody>
    </table>;
  }
}