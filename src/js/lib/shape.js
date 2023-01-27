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
