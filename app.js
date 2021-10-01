import AppController from './src/appController.js';
import DraggableItems from './src/draggableItems.js';

const appController = new AppController({
    draggableItems: new DraggableItems
});

appController.initialize();
