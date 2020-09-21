import { ParametrizedEvent } from '../utils/parametrizedEvent';
import { $g } from './parsingUtils';
import { getBuildingTypeById } from './model/buildingType';

export class TravianUrlWatcher {
  onVillagesListOpened = new ParametrizedEvent();
  onUrlChanged = new ParametrizedEvent();
  onBuildingPageOpened = new ParametrizedEvent();
  onResourcesPageOpened = new ParametrizedEvent();

  onIframeLoad(iFrame) {
    const href = iFrame.contentWindow.location.href;
    this.onUrlChanged.broadcast(href);
    this.onVillagesListOpened.broadcast();
    if(href.includes("build.php")) {
      const buildingHtml = $g('build', iFrame.contentWindow.document);
      if(buildingHtml !== undefined) {
        const buildingId = buildingHtml.className.match(/(gid\d+)/)[1];
        this.onBuildingPageOpened.broadcast(getBuildingTypeById(buildingId));
      }
    }
    if(href.includes("dorf1.php")) {
      this.onResourcesPageOpened.broadcast();
    }
  }
}