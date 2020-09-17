import React, { Component } from 'react';
import FloatingWindow from './FloatingWindow/FloatingWindow';
import { TravianScanner } from './travianScanner/travianScanner';
import VillagesList from './VillagesList/VillagesList';

class App extends Component {

  componentDidMount() {

  }

  render() {
    this.travianScanner = new TravianScanner("background");
    this.villages = this.travianScanner.scanVillages();
    return (
      <div className="appRoot">
        <FloatingWindow componentId="villagesList">
          <VillagesList villagesList={this.villages.villagesList}/>
        </FloatingWindow>
      </div>
    );
  }
}

export default App;
