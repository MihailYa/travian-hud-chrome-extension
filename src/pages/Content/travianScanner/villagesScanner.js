import { $gc, $gt, retrieveNumber } from './parsingUtils';
import { createVillage } from './model/village';
import { coordsToVillageId } from './travianUtils';
import { TravianScannerBase } from './travianScannerBase';

export class VillagesScanner extends TravianScannerBase {

  /**
   * Scan villages list panel
   * @returns {{villagesList: [], activeVillageIndex: number}}
   */
  scanVillages() {
    const villagesHtml = $gt('li', this.g('sidebarBoxVillagelist'));
    const villagesList = [];
    let activeVillageIndex;
    for (let i = 0; i < villagesHtml.length; i++) {
      const villageHtmlHref = $gt('a', villagesHtml[i])[0];
      const villageLink = villageHtmlHref.getAttribute('href');
      const isActive = villageHtmlHref.getAttribute('class').match(/active/i);
      if (isActive) {
        activeVillageIndex = i;
      }
      const villageName = $gc('name', villageHtmlHref)[0].textContent;
      const coordinates = {
        x: retrieveNumber($gc('coordinateX', villageHtmlHref)[0].textContent),
        y: retrieveNumber($gc('coordinateY', villageHtmlHref)[0].textContent),
      };
      const villageId = coordsToVillageId(this.mapSize, coordinates.x, coordinates.y);
      villagesList.push(createVillage(i, villageId, villageName, villageLink, coordinates, isActive));
    }

    return {
      activeVillageIndex: activeVillageIndex,
      villagesList: villagesList,
    };
  }
}