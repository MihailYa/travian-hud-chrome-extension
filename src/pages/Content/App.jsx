import React, { Component } from 'react';
import FloatingWindow from './FloatingWindow/FloatingWindow';
import { TravianScanner } from './travianScanner/travianScanner';
import VillagesList from './VillagesList/VillagesList';
import { TravianUrlWatcher } from './travianScanner/travianUrlWatcher';
import log from 'loglevel';


class App extends Component {
  logger = log.getLogger("App");
  floatingWindowRef = React.createRef();

  constructor(props) {
    super(props);

    this.travianUrlWatcher = new TravianUrlWatcher();
  }

  onIframeLoad() {
    this.logger.trace("Travian iframe is loaded");
    const iFrame = this.floatingWindowRef.current;
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight + 'px';

    this.travianScanner = new TravianScanner('background', iFrame.contentWindow.document);
    const newState = Object.assign({}, this.state);
    newState.villages = this.travianScanner.scanVillages();
    this.setState(newState);

    this.travianUrlWatcher.onIframeLoad(iFrame);
  }

  render() {
    const content = () => (
      <FloatingWindow componentId="villagesList">
        <VillagesList villagesList={this.state.villages.villagesList} />
      </FloatingWindow>
    );

    return (
      <div className="appRoot">
        {this.travianScanner !== undefined && content()}
        <iframe title={'Travian main'} src={window.location.href} className="travianIframe" ref={this.floatingWindowRef}
                onLoad={this.onIframeLoad.bind(this)} scrolling="no" />
      </div>
    );
  }
}

export default App;
