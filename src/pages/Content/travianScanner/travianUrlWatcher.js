import { ParametrizedEvent } from '../utils/parametrizedEvent';
import { $gc } from './parsingUtils';

export class TravianUrlWatcher {
  onBuildingPageOpened = new ParametrizedEvent();

  onIframeLoad(iFrame) {
    const href = iFrame.contentWindow.location.href;
    if(href.includes("build.php")) {
      if($gc('upgradeBuilding', iFrame.contentWindow.document).length !== 0) {
        this.onBuildingPageOpened.broadcast();
      }
    }
  }
}