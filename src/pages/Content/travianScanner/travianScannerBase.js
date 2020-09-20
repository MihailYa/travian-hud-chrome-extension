import { $g } from './parsingUtils';
import { detectMapSize } from './travianUtils';

export class TravianScannerBase {
  constructor(travianRootId, rootDocument) {
    this.travianRootId = travianRootId;
    this.rootDocument = rootDocument;
    this.mapSize = detectMapSize();
  }

  // Get root element
  r() {
    return $g(this.travianRootId, this.rootDocument);
  }

  // Get element by id
  g(aID) {
    return $g(aID, this.rootDocument);
  }

  // Get element by name
  gn(aID) {
    return this.r().getElementsByName(aID);
  }

  // Get element by tag name
  gt(tagName, root = undefined) {
    return (typeof root == 'undefined' ? this.r() : root).getElementsByTagName(tagName);
  }

  // Get element by class name
  gc(className, root = undefined) {
    return (typeof root == 'undefined' ? this.r() : root).getElementsByClassName(className);
  }
}