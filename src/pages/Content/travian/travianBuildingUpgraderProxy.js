import { $g, $gc } from '../travianScanner/parsingUtils';

export class TravianBuildingUpgraderProxy {
  onBuildingPageLoaded(iFrameWindow) {
    const runVideoButton = $gc('videoFeatureButton', iFrameWindow.document)[0];
    const buttonScript = runVideoButton.id + '_script';
    runVideoButton.removeAttribute('onclick');
    $g(buttonScript, iFrameWindow.document).remove();
    runVideoButton.onclick = () => {
      window.location.replace(iFrameWindow.location.href + "&upgrade=true");
    }
  }

  // Returns if the application should be loaded
  onPageLoaded() {
    const hrefParams = window.location.search;
    if(hrefParams.includes('&upgrade=true')) {
      $gc('videoFeatureButton')[0].click();
      return false;
    }
    return true;
  }
}