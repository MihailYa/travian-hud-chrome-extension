import { TravianScannerInterface } from './travianScannerInterface';

/* Abstract class for instantiating other scanners,
 * who need to access TravianDocumentScanner realisation through aggregation
 */
export class AbstractTravianScanner extends TravianScannerInterface {
  constructor(travianDocumentScanner) {
    super();
    this.travianDocumentScanner = travianDocumentScanner;
  }

  r() {
    return this.travianDocumentScanner.r();
  }

  // Get element by id
  g(aID) {
    return this.travianDocumentScanner.g(aID);
  }

  // Get element by name
  gn(aID) {
    return this.travianDocumentScanner.gn(aID);
  }

  // Get element by tag name
  gt(tagName, root = undefined) {
    return this.travianDocumentScanner.gt(tagName, root);
  }

  // Get element by class name
  gc(className, root = undefined) {
    return this.travianDocumentScanner.gc(className, root);
  }

  // Get events that can be occurred while scanning
  getEvents() {
    return {};
  }
}