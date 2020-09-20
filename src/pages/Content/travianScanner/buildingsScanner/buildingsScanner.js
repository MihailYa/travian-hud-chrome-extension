import { TravianScannerBase } from '../travianScannerBase';
import { TrainingTroopsScanner } from './trainingTroopsScanner';
import { ParametrizedEvent } from '../../utils/parametrizedEvent';
import { BuildingType } from '../model/buildingType';
import { BuildingScannerBase } from './buildingScannerBase';

export class BuildingsScanner extends TravianScannerBase {
  onAnyBuildingScanned = new ParametrizedEvent();
  onBarracksScanned = new ParametrizedEvent();

  constructor(travianRootId, rootDocument) {
    super(travianRootId, rootDocument);

    const trainingTroopsScanner = new TrainingTroopsScanner(travianRootId, rootDocument);
    const buildingScannerBase = new BuildingScannerBase(travianRootId, rootDocument);

    this.barracksScanner = trainingTroopsScanner;
    this.stableScanner = trainingTroopsScanner;
    this.palaceScanner = trainingTroopsScanner;
    this.residenceScanner = trainingTroopsScanner;
    this.marketplaceScanner = buildingScannerBase;
    this.townHallScanner = buildingScannerBase;
    this.academyScanner = buildingScannerBase;
    this.rallyPointScanner = buildingScannerBase;
    this.smithyScanner = buildingScannerBase;
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
    switch (buildingType) {
      case BuildingType.BARRACKS:
        return {
          scanner: this.barracksScanner,
          event: this.onBarracksScanned,
        };
      case BuildingType.STABLE:
        return {
          scanner: this.stableScanner,
        };
      case BuildingType.PALACE:
        return {
          scanner: this.palaceScanner,
        };
      case BuildingType.RESIDENCE:
        return {
          scanner: this.residenceScanner,
        };
      case BuildingType.MARKETPLACE:
        return {
          scanner: this.marketplaceScanner,
        };
      case BuildingType.TOWN_HALL:
        return {
          scanner: this.townHallScanner,
        };
      case BuildingType.ACADEMY:
        return {
          scanner: this.academyScanner,
        };
      case BuildingType.RALLY_POINT:
        return {
          scanner: this.rallyPointScanner,
        };
      case BuildingType.SMITHY:
        return {
          scanner: this.smithyScanner,
        };
      default:
        return {};
    }
  }
}