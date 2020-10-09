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
  iFrameRef = React.createRef();

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
    const iFrame = this.iFrameRef.current;

    // Make body height equal to iframe height
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight + 'px';

    this.travianScannersSetuper.onMainDocumentLoaded(iFrame.contentWindow.document);
    this.travianUrlWatcher.onIframeLoad(iFrame);
  }

  onLinkPressed(href) {
    this.iFrameRef.current.contentWindow.location = href;
  }

  render() {
    const content = () => (
      <FloatingWindow componentId="villagesList">
        <VillagesList onLinkPressed={this.onLinkPressed.bind(this)}/>
      </FloatingWindow>
    );

    return (
      <div className="appRoot">
        {content()}
        <iframe title={'Travian main'} src={window.location.href} className="travianIframe" ref={this.iFrameRef}
                onLoad={this.onIframeLoad.bind(this)} scrolling="no" />
      </div>
    );
  }
}

export default connect()(App);
