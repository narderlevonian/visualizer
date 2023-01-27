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
