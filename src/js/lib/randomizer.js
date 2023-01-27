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
