import AppController from './appController.js';
import CanvasManager from './canvasManager.js';

const appController = new AppController({
    canvasManager: new CanvasManager
});

appController.initialize();
