import { $gc, $gt } from '../parsingUtils';
import { ParametrizedEvent } from '../../utils/parametrizedEvent';
import { AbstractTravianScanner } from './abstractTravianScanner';

export class BuildsProgressScanner extends AbstractTravianScanner {
  onBuildsScanned = new ParametrizedEvent();

  onBuildsProgressPageOpened() {
    const buildingListCollection = this.gc('buildingList');
    const buildsProgress = [];
    if (buildingListCollection.length !== 0) {
      const buildingListHtml = buildingListCollection[0];
      const progressRows = $gt('li', buildingListHtml);
      for (let i = 0; i < progressRows.length; i++) {
        const buildingDesc = $gc('name', progressRows[i])[0].innerHTML;
        const buildingName = buildingDesc.match(/[^<]*/)[0].trim();
        const buildingLevel = parseInt(buildingDesc.match(/\d+/)[0]);

        const timeLeft = $gc('timer', progressRows[i])[0].getAttribute('value');
        const endTime = new Date().getTime() / 1000 + timeLeft;

        buildsProgress.push({
          buildingName: buildingName,
          buildingLevel: buildingLevel,
          endTime: endTime,
        });
      }
    }

    this.onBuildsScanned.broadcast(buildsProgress);
  }

  getEvents() {
    return { 'Builds.onBuildsScanned': this.onBuildsScanned };
  }
}