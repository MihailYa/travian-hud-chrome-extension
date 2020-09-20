import React, { Component } from 'react';
import FloatingWindow from './FloatingWindow/FloatingWindow';
import { VillagesScanner } from '../travianScanner/villagesScanner';
import VillagesList from './VillagesList/VillagesList';
import { TravianUrlWatcher } from '../travianScanner/travianUrlWatcher';
import log from 'loglevel';
import { connect } from 'react-redux';
import { setVillages } from '../reduxStore/villages';
import { BuildingsScanner } from '../travianScanner/buildingsScanner/buildingsScanner';


class App extends Component {
  logger = log.getLogger("App");
  floatingWindowRef = React.createRef();

  constructor(props) {
    super(props);

    this.travianUrlWatcher = new TravianUrlWatcher();
    this.travianUrlWatcher.onBuildingPageOpened.addEventListener((buildingType) => {
      this.buildingsScanner.onBuildingPageOpened(buildingType);
    });
    this.travianUrlWatcher.onUrlChanged.addEventListener(url => {
      window.history.pushState({}, document.title, url);
    })
  }

  onIframeLoad() {
    this.logger.trace("Travian iframe is loaded");
    const iFrame = this.floatingWindowRef.current;
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight + 'px';

    this.travianScanner = new VillagesScanner('background', iFrame.contentWindow.document);
    this.buildingsScanner = new BuildingsScanner('background', iFrame.contentWindow.document);
    this.buildingsScanner.onAnyBuildingScanned.addEventListener((data) => {
      console.log("Any building data: " + JSON.stringify(data));
    })

    this.props.dispatch(setVillages(this.travianScanner.scanVillages()))

    this.travianUrlWatcher.onIframeLoad(iFrame);
  }

  render() {
    const content = () => (
      <FloatingWindow componentId="villagesList">
        <VillagesList />
      </FloatingWindow>
    );

    return (
      <div className="appRoot">
        {content()}
        <iframe title={'Travian main'} src={window.location.href} className="travianIframe" ref={this.floatingWindowRef}
                onLoad={this.onIframeLoad.bind(this)} scrolling="no" />
      </div>
    );
  }
}

export default connect()(App);
