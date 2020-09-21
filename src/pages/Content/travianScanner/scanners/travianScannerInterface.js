// Interface for all scanners
export class TravianScannerInterface {
  r() {
  }

  // Get element by id
  g(aID) {
  }

  // Get element by name
  gn(aID) {
  }

  // Get element by tag name
  gt(tagName, root = undefined) {
  }

  // Get element by class name
  gc(className, root = undefined) {
  }
}