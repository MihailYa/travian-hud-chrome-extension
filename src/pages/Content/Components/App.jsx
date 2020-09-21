import React, { Component } from 'react';
import FloatingWindow from './FloatingWindow/FloatingWindow';
import { VillagesScanner } from '../travianScanner/scanners/villagesScanner';
import VillagesList from './VillagesList/VillagesList';
import { TravianUrlWatcher } from '../travianScanner/travianUrlWatcher';
import log from 'loglevel';
import { connect } from 'react-redux';
import { setVillages } from '../reduxStore/villages';
import { BuildingsScanner } from '../travianScanner/scanners/buildingsScanner/buildingsScanner';
import { BuildsProgressScanner } from '../travianScanner/scanners/buildsProgressScanner';
import { TravianScannersSetuper } from '../travianScanner/scanners/setup/travianScannersSetuper';
import { EventsDispatchSetuper } from '../travianScanner/scanners/setup/eventsDispatchSetuper';


class App extends Component {
  logger = log.getLogger("App");
  floatingWindowRef = React.createRef();

  constructor(props) {
    super(props);

    this.travianUrlWatcher = new TravianUrlWatcher();
    this.travianUrlWatcher.onUrlChanged.addEventListener(url => {
      // Sync browser URL with iframe URL
      window.history.pushState({}, document.title, url);
    })
    // Setup document parsing
    this.travianScannersSetuper = new TravianScannersSetuper(this.travianUrlWatcher);
    // Setup dispatching parsing results
    const eventsDispatchSetuper = new EventsDispatchSetuper();
    eventsDispatchSetuper.setupDispatching(this.props.dispatch, this.travianScannersSetuper.getEvents())
  }

  onIframeLoad() {
    this.logger.trace("Travian iframe is loaded");
    const iFrame = this.floatingWindowRef.current;
    // Make body height equal to iframe height
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight + 'px';
    //this.props.dispatch(setVillages(this.travianScanner.onVillagesListOpened()))

    this.travianScannersSetuper.onMainDocumentLoaded(iFrame.contentWindow.document);
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
