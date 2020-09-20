import { TravianScannerBase } from '../travianScannerBase';

export class BuildingScannerBase extends TravianScannerBase {
  scanBuilding() {
    const progress = this.scanProgress();
    return this.parseContent(progress);
  }

  parseContent(progress) {
    // Implemented in inheritors
    return progress;
  }

  /**
   * Scan progress table
   * @returns [{content, endTime}]
   */
  scanProgress() {
    const progress = [];
    const progressTable = this.gc('under_progress')[0];
    if (progressTable === undefined)
      return progress;
    const progressTableRows = progressTable.rows;
    for (let i = 1; i < progressTableRows.length; i++) {
      const progressTableCells = progressTableRows[i].cells;
      if (progressTableCells.length !== 3)
        continue;
      const content = progressTableCells[0].innerHTML;
      const timeLeft = progressTableCells[1].children[0].getAttribute('value');
      const endTime = new Date().getTime() / 1000 + timeLeft;
      progress.push({
        content: content,
        endTime: endTime,
      });
    }
    return progress;
  }
}