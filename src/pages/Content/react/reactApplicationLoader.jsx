import log from 'loglevel';

export class ReactApplicationLoader {
  logger = log.getLogger("ReactApplicationLoader");
  loadConditions = [];

  constructor(prerenderScript, renderScript, postRenderScript) {
    this.prerenderScript = prerenderScript;
    this.renderScript = renderScript;
    this.postRenderScript = postRenderScript;
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
      const postRenderParams = this.renderScript(renderParams);
      this.postRenderScript(postRenderParams);
      this.logger.trace("Travian HUD React is rendered");
    } else {
      this.logger.trace("Travian HUD React is disabled due to load conditions");
    }
  }
}