const EventsHandler = require('./eventsHandler.js');

const markup = require('./lib/markup.js');
const shape = require('./lib/shape.js');

const option = require('./option.config.js');
const structure = require('./structure.config.js');


class Application {
    constructor() {
        markup.extractFrom(option.rootElement, structure);
        markup.extractFrom(option.buttonAreaQuery, structure.buttonArea.content);

        shape.insertMore(option.animationAreaQuery, option.shapesAmount);

        this.eventsHandler = new EventsHandler();
    }
}

module.exports = Application;
global.Application = Application;
