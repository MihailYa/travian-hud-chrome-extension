import { $g, $gc, $gt, retrieveNumber } from './parsingUtils';
import { Village } from './model/village';
import { coordsToVillageId, detectMapSize } from './travianUtils';

export class TravianScanner {
  constructor(travianRootId) {
    this.travianRootId = travianRootId;
    this.mapSize = detectMapSize();
  }

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
      villagesList.push(new Village(i, villageId, villageName, villageLink, coordinates, isActive));
    }

    return {
      activeVillageIndex: activeVillageIndex,
      villagesList: villagesList,
    };
  }

  // Get element by id
  g(aID) {
    return $g(aID);
  }

  // Get element by name
  gn(aID) {
    return $g(this.travianRootId).getElementsByName(aID);
  }

  // Get element by tag name
  gt(tagName, root = undefined) {
    return (typeof root == 'undefined' ? $g(this.travianRootId) : root).getElementsByTagName(tagName);
  }

  // Get element by class name
  gc(className, root = undefined) {
    return (typeof root == 'undefined' ? $g(this.travianRootId) : root).getElementsByClassName(className);
  }
}