import { $gc, $gt, retrieveNumber } from '../parsingUtils';
import { createVillage } from '../model/village';
import { coordsToVillageId } from '../travianUtils';
import { AbstractTravianScanner } from './abstractTravianScanner';
import { ParametrizedEvent } from '../../utils/parametrizedEvent';

export class VillagesScanner extends AbstractTravianScanner {
  // {{villagesList: [], activeVillageIndex: number}}
  onVillagesScanned = new ParametrizedEvent();

  /**
   * Scan villages list panel
   */
  onVillagesListOpened() {
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
    this.onVillagesScanned.broadcast({
      activeVillageIndex: activeVillageIndex,
      villagesList: villagesList,
    });
  }

  getEvents() {
    return { 'Villages.onVillagesScanned': this.onVillagesScanned };
  }
}