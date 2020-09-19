// Get element by id
export function $g(aID, root) {
  return (typeof root == 'undefined' ? document : root).getElementById(aID);
}

// Get element by name
export function $gn(aID) {
  return document.getElementsByName(aID);
}

// Get element by tag name
export function $gt(str, m) {
  return (typeof m == 'undefined' ? document : m).getElementsByTagName(str);
}

// Get element by class name
export function $gc(str, m) {
  return (typeof m == 'undefined' ? document : m).getElementsByClassName(str);
}

export function $xf(xpath, xpt, startnode, aDoc) {
  const XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
  const XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
  const XPIterator = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
  const XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
  if (!aDoc) aDoc = document;
  if (!startnode) startnode = document;
  let xpres;
  switch (xpt) {
    case 'i':
      xpres = XPIterator;
      break;
    case 'l':
      xpres = XPList;
      break;
    case 'r':
      xpres = XPResult;
      break;
    default:
      xpres = XPFirst;
  }
  const ret = aDoc.evaluate(xpath, startnode, null, xpres, null);
  return (xpres === XPFirst ? ret.singleNodeValue : ret);
}

export function retrieveNumber(str) {
  return parseInt(
    str.match(/−‭?\d+/)[0]       // Clearing all not number symbols
      .replace('−‭', '-'));       // Replacing '−' symbol by '-'
}