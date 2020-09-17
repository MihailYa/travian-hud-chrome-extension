import { $xf } from './parsingUtils';

export function coordsToVillageId(mapSize, x, y) {
  const mapRadius = (mapSize - 1) / 2;
  return (1 + (x + mapRadius) + (mapSize * Math.abs(y - mapRadius)));
}

export function detectMapSize() {
  const textHtml = $xf('//script[contains(text(),"TravianDefaults")]');
  if (textHtml) {
    // eslint-disable-next-line no-eval
    eval(textHtml.textContent);
    return window.TravianDefaults["Map"]["Size"]["width"];
  } else {
    return undefined;
  }
}