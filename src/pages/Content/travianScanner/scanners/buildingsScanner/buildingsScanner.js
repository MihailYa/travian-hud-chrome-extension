import { TravianDocumentScanner } from '../travianDocumentScanner';
import { TrainingTroopsScanner } from './trainingTroopsScanner';
import { ParametrizedEvent } from '../../../utils/parametrizedEvent';
import { BuildingType } from '../../model/buildingType';
import { BuildingScannerBase } from './buildingScannerBase';
import { AbstractTravianScanner } from '../abstractTravianScanner';

export class BuildingsScanner extends AbstractTravianScanner {
  onAnyBuildingScanned = new ParametrizedEvent();
  onBarracksScanned = new ParametrizedEvent();

  constructor(travianDocumentScanner) {
    super(travianDocumentScanner);

    const trainingTroopsScanner = new TrainingTroopsScanner(travianDocumentScanner);
    const buildingScannerBase = new BuildingScannerBase(travianDocumentScanner);

    this.barracksScanner = trainingTroopsScanner;
    this.stableScanner = trainingTroopsScanner;
    this.palaceScanner = trainingTroopsScanner;
    this.residenceScanner = trainingTroopsScanner;
    this.marketplaceScanner = buildingScannerBase;
    this.townHallScanner = buildingScannerBase;
    this.academyScanner = buildingScannerBase;
    this.rallyPointScanner = buildingScannerBase;
    this.smithyScanner = buildingScannerBase;

    this.events = {};
    for (let buildingType in BuildingType) {
      this.events[buildingType] = new ParametrizedEvent();
    }
  }

  onBuildingPageOpened(buildingType) {
    const scannerAndEventForBuilding = this.getScannerAndEventForBuilding(buildingType);
    if (scannerAndEventForBuilding.scanner !== undefined) {
      const scanResult = scannerAndEventForBuilding.scanner.scanBuilding();
      if (scannerAndEventForBuilding.event !== undefined) {
        scannerAndEventForBuilding.event.broadcast(scanResult);
      }
      this.onAnyBuildingScanned.broadcast(scanResult);
    }
  }

  // Private
  getScannerAndEventForBuilding(buildingType) {
    let scanner;
    switch (buildingType) {
      case BuildingType.BARRACKS:
        scanner =
          this.barracksScanner;
        break;
      case BuildingType.STABLE:
        scanner =
          this.stableScanner;
        break;
      case BuildingType.PALACE:
        scanner =
          this.palaceScanner;
        break;
      case BuildingType.RESIDENCE:
        scanner =
          this.residenceScanner;
        break;
      case BuildingType.MARKETPLACE:
        scanner =
          this.marketplaceScanner;
        break;
      case BuildingType.TOWN_HALL:
        scanner =
          this.townHallScanner;
        break;
      case BuildingType.ACADEMY:
        scanner =
          this.academyScanner;
        break;
      case BuildingType.RALLY_POINT:
        scanner =
          this.rallyPointScanner;
        break;
      case BuildingType.SMITHY:
        scanner =
          this.smithyScanner;
        break;
      default:
        scanner = undefined;
    }
    return {
      scanner: scanner,
      event: this.events[buildingType.name]
    }
  }

  // Buildings.BuildingType
  // Example: Buildings.BARRACKS
  getEvents() {
    const eventsList = {};
    for (let eventsKey in this.events) {
      eventsList['Buildings.' + eventsKey] = this.events[eventsKey];
    }
  }
}