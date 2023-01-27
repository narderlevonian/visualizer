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
