(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./eventsHandler.js":2,"./lib/markup.js":4,"./lib/shape.js":6,"./option.config.js":10,"./structure.config.js":11}],2:[function(require,module,exports){
const DataSwitch = require('./obj/dataSwitch.js');
const AnimationInspector = require('./obj/animationInspector.js');

const markup = require('./lib/markup.js');
const shape = require('./lib/shape.js');
const converter = require('./lib/converter.js');

const option = require('./option.config.js');

class EventsHandler {
    constructor() {
        this.animationInspector = new AnimationInspector(this.animate.bind(this), option.animationInterval);
        this.blendingModeSwitcher = new DataSwitch(option.blendingModeList, option.blendingModeDefault);

        this.enableBackgroundAnimation = false;

        this.initialization();
        this.bindEvents();
    }

    initialization() {
        markup.switchEnabledStateFor([
            'animateBackground',
            'resetAll',
        ]);

        markup.shiftMixingMode(option.animationAreaQuery, this.blendingModeSwitcher.current());
    }

    onCreateClickHandler(event) {
        switch (event.target.id) {
            case 'runAnimation':
                this.animationInspector.start();
                markup.switchEnabledStateFor([
                    'runAnimation',
                    'refreshShapes',
                    'animateBackground',
                    'resetAll'
                ]);
                break;

            case 'refreshShapes':
                shape.refreshAll(option.animationShapeQuery);
                break;

            case 'duplicateShapes':
                shape.changeQt(option.animationAreaQuery, option.animationShapeQuery, true);
                break;

            case 'cleanHalf':
                shape.changeQt(option.animationAreaQuery, option.animationShapeQuery, false);
                break;

            case 'changeBackground':
                markup.fillBackground(option.rootElement);
                break;

            case 'animateBackground':
                this.enableBackgroundAnimation = true;
                markup.switchEnabledStateFor(['changeBackground']);
                break;

            case 'changeMixingMode':
                markup.shiftMixingMode(option.animationAreaQuery, this.blendingModeSwitcher.next());
                break;

            case 'resetAll':
                this.animationInspector.reset();
                markup.switchEnabledStateFor([
                    'runAnimation',
                    'refreshShapes',
                    'animateBackground',
                    'resetAll'
                ]);
        }
    }

    bindEvents() {
        document.querySelector(option.buttonAreaQuery).addEventListener('click', this.onCreateClickHandler.bind(this));
    }

    animate() {
        shape.refreshAll(option.animationShapeQuery);
        if (this.enableBackgroundAnimation) {
            markup.fillBackground(option.rootElement);
        }
    }
}

module.exports = EventsHandler;

},{"./lib/converter.js":3,"./lib/markup.js":4,"./lib/shape.js":6,"./obj/animationInspector.js":8,"./obj/dataSwitch.js":9,"./option.config.js":10}],3:[function(require,module,exports){
const converter = {
    toHex: function(number) {
        let hex = number.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },

    toIdSelector: function(name) {
        return `#${name}`;
    },

    toClassSelector: function(name) {
        return `.${name}`;
    }
};

module.exports = converter;

},{}],4:[function(require,module,exports){
const randomizer = require('./randomizer.js');
const converter = require('./converter.js');

const markup = {
    extractFrom: function(parent, data) {
        for (const [key, value] of Object.entries(data)) {
            const element = document.createElement(value.type);

            element.id = key;

            document.querySelector(parent).appendChild(element);

            if (value.type == 'button') {
                element.innerHTML = value.text;
            }
        }
    },

    fillBackground: function(selector) {
        document.querySelector(selector).style.backgroundColor = randomizer.getRGBA();
    },

    shiftMixingMode: function(selector, mode) {
        document.querySelector(selector).style.mixBlendMode = mode;
    },

    switchEnabledState: function(selector) {
        let element = document.querySelector(selector);
        element.disabled ? element.disabled = false : element.disabled = true;
    },

    switchEnabledStateFor: function(list) {
        list.forEach((selector) => {
            markup.switchEnabledState(converter.toIdSelector(selector));
        });
    }
};

module.exports = markup;

},{"./converter.js":3,"./randomizer.js":5}],5:[function(require,module,exports){
const option = require('../option.config.js');

const randomizer = {
    getNumber: function(limit) {
        return Math.floor(Math.random() * limit);
    },

    getPercent: function(limit) {
        return randomizer.getNumber(limit) + '%';
    },

    getRGBA: function() {
        const r = randomizer.getNumber(option.chanellLimit);
        const g = randomizer.getNumber(option.chanellLimit);
        const b = randomizer.getNumber(option.chanellLimit);

        const a = (randomizer.getNumber(option.chanellLimit) / option.chanellLimit).toFixed(2);

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
};

module.exports = randomizer;

},{"../option.config.js":10}],6:[function(require,module,exports){
const option = require('../option.config.js');
const randomizer = require('./randomizer.js');
const tool = require('./tool.js');

const shape = {
    make: function() { // create
        let element = document.createElement('div');

        element.className = option.animationShapeQuery.slice(1);
        element = shape.refresh(element);

        return element;
    },

    refresh: function(element) { // update
        element.style.width = randomizer.getPercent(option.percentHalf);
        element.style.height = randomizer.getPercent(option.percentMaximum);

        element.style.backgroundColor = randomizer.getRGBA();

        return element;         // without return
    },

    refreshAll: function(selector) {
        document.querySelectorAll(selector).forEach((element) => {
            element = shape.refresh(element);
        });
    },

    insert: function(parent, element) {  // append
        document.querySelector(parent).appendChild(shape.refresh(element));
    },

    insertMore: function(parent, amount) {  // appendList
        tool.repeat(amount, () => {
            shape.insert(parent, shape.make());
        });
    },

    remove: function(parent) {
        document.querySelector(parent).removeChild(element);
    },

    removaAll: function(parent) {
        document.querySelector(parent).innerHTML = "";
    },

    changeQt: function(parent, selector, isIncreasing) {
        let iterator = 0;
        let amount = document.querySelectorAll(selector).length;

        shape.removaAll(parent);
        isIncreasing ? shape.insertMore(parent, amount * 2) : shape.insertMore(parent, amount / 2);;

    },

};

module.exports = shape;

},{"../option.config.js":10,"./randomizer.js":5,"./tool.js":7}],7:[function(require,module,exports){
const tool = {
	repeat: function (times, callback) {
		for (let i = 0; i < times; i++) {
			callback.call();
		}
	}
};

module.exports = tool;
},{}],8:[function(require,module,exports){
class AnimationInspector {
    constructor(callback, interval) {
        this.callback = callback;
        this.interval = interval;

        this.animationFrame = {};
    }

    start() {
        this.timer = window.setInterval(() => {
            this.animationFrame = window.requestAnimationFrame(this.callback, this.interval);
        }, this.interval);
    }

    reset() {
        window.cancelAnimationFrame(this.animationFrame);
        window.clearInterval(this.timer);
    }
}

module.exports = AnimationInspector;

},{}],9:[function(require,module,exports){
class DataSwitch {
    constructor(data, pointer) {
        this.list = data;
        this.length = data.length;
        this.pointer = pointer;
    }

    next() {
        (this.pointer == this.length - 1) ? this.pointer = 0: this.pointer++;
        return this.list[this.pointer];
    }

    current() {
        return this.list[this.pointer];
    }
}

module.exports = DataSwitch;

},{}],10:[function(require,module,exports){
const option = {
    chanellLimit: 255,

    percentHalf: 62,
    percentMaximum: 100,

    shapesAmount: 262,

    animationInterval: 618,
    animationShapeQuery: '.colorize',
    animationAreaQuery: '#animationArea',

    buttonAreaQuery: '#buttonArea',

    rootElement: 'body',

    blendingModeList: [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity'
    ],

    blendingModeDefault: 15
}

module.exports = option;

},{}],11:[function(require,module,exports){
const structure = {
    animationArea: {
        type: 'div'
    },
    buttonArea: {
        type: 'div',
        content: {
            runAnimation: {
                text: 'Run',
                type: 'button',

            },
            refreshShapes: {
                text: 'Refresh Shapes',
                type: 'button',

            },
            duplicateShapes: {
                text: 'Duplicate Shapes',
                type: 'button',

            },
            cleanHalf: {
                text: 'Clean Half',
                type: 'button',

            },
            changeBackground: {
                text: 'Change Background',
                type: 'button',

            },
            animateBackground: {
                text: 'Animate Background',
                type: 'button',


            },
            changeMixingMode: {
                text: 'Change Mixing Mode',
                type: 'button',

            },
            resetAll: {
                text: 'Reset All',
                type: 'button',

            },
        }
    }
}

module.exports = structure;

},{}]},{},[1])