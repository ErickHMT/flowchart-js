export default class AppController {
    constructor({ canvasManager }) {
        this.canvasManager = canvasManager;
    }

    initialize() {
        this.canvasManager.initialize();
    }
}