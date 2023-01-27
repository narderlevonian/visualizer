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
            case 'runAnimation':        /// Вынести в контстанты и kjkjkjk-hjkjkjk <= jkjkjJkkkkkjJJJkkkk
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

    // Commands.functionForRun вынести в отдельный модуль
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
