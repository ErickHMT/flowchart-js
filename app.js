import AppController from './src/appController.js';
import CanvasManager from './src/canvasManager.js';

const appController = new AppController({
    canvasManager: new CanvasManager
});

appController.initialize();
