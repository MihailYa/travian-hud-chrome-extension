import { VillagesScanner } from '../villagesScanner';
import { BuildingsScanner } from '../buildingsScanner/buildingsScanner';
import { BuildsProgressScanner } from '../buildsProgressScanner';
import { TravianDocumentScanner } from '../travianDocumentScanner';

export class TravianScannersSetuper {
  constructor(travianUrlWatcher) {
    this.travianUrlWatcher = travianUrlWatcher;
    this.travianUrlWatcher.onBuildingPageOpened.addEventListener((buildingType) => {
      if (this.travianDocumentScanner != null)
        this.buildingsScanner.onBuildingPageOpened(buildingType);
    });
    this.travianUrlWatcher.onResourcesPageOpened.addEventListener(() => {
      if (this.travianDocumentScanner != null)
        this.buildsProgressScanner.onBuildsProgressPageOpened();
    });
    this.travianUrlWatcher.onVillagesListOpened.addEventListener(() => {
      if (this.travianDocumentScanner != null)
        this.villagesScanner.onVillagesListOpened();
    });

    this.travianDocumentScanner = null;
    this.villagesScanner = new VillagesScanner(this.travianDocumentScanner);
    this.buildingsScanner = new BuildingsScanner(this.travianDocumentScanner);
    this.buildsProgressScanner = new BuildsProgressScanner(this.travianDocumentScanner);

    this.scanners = [
      this.villagesScanner,
      this.buildingsScanner,
      this.buildsProgressScanner,
    ];
  }

  onMainDocumentLoaded(mainDocument) {
    this.travianDocumentScanner = new TravianDocumentScanner('background', mainDocument);
    for (let i = 0; i < this.scanners.length; i++) {
      this.scanners[i].travianDocumentScanner = this.travianDocumentScanner;
    }
  }

  getEvents() {
    let events = {};
    for (let i = 0; i < this.scanners.length; i++) {
      events = { ...events, ...this.scanners[i].getEvents() };
    }
    return events;
  }
}