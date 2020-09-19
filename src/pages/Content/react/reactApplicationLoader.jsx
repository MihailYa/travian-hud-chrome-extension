export class ReactApplicationLoader {
  loadConditions = [];

  constructor(prerenderScript, renderScript) {
    this.prerenderScript = prerenderScript;
    this.renderScript = renderScript;
  }

  addLoadCondition(loadCondition) {
    this.loadConditions.push(loadCondition);
  }

  checkLoadConditions() {
    return this.loadConditions.length === 0 || this.loadConditions.every(loadCondition => loadCondition());
  }

  loadApplication() {
    if (this.checkLoadConditions()) {
      const renderParams = this.prerenderScript();
      this.renderScript(renderParams);
    }
  }
}