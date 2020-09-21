import { BuildingScannerBase } from './buildingScannerBase';

export class TrainingTroopsScanner extends BuildingScannerBase {
  /**
   *
   * @param progress
   * @returns {{
   * totalTroopsCount: {
   *    troopsName: {
   *      img,
   *      count
   *    }
   * },
   * progress: [{
   *    endTime,
   *    content: {
   *      troopsName,
   *      troopsCount
   *    }
   *  }]
   * }}
   */
  parseContent(progress) {
    const totalTroopsCount = {};
    for (let i = 0; i < progress.length; i++) {
      const content = progress[i].content;
      const troopsCount = content.match(/.*>\s*(\d*)/)[1];
      const troopsName = content.match(/.*>\s*\d*\s*([^\s]*)/)[1];
      progress[i].content = {
        troopsName: troopsName,
        troopsCount: troopsCount
      }
      if(troopsName in totalTroopsCount) {
        totalTroopsCount[troopsName].count += troopsCount;
      } else {
        const img = content.match(/[^<]*([^>]*)/)[1] + ">";
        totalTroopsCount[troopsName] = {
          img: img,
          count: troopsCount
        };
      }
    }
    // noinspection JSValidateTypes
    return {
      totalTroopsCount: totalTroopsCount,
      progress: progress
    }
  }

}