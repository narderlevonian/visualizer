const CoreHelper = {
    getRandomFrom(max) {
        return Math.floor(Math.random() * max);
    },

    getRandomFromPercent(max) {
        return max > 100 ? "100%" : Math.floor(Math.random() * max) + '%';
    },

    getRandomFromCoeficient(max) {
        return max > 100 ? 1 : (Math.floor(Math.random() * max)) / 100;
    },

    getRandomFromChanell() {
        return CoreHelper.convertToHex(CoreHelper.getRandomFrom(255));
    },

    getRandomBrush() {
        return '#' + CoreHelper.getRandomFromChanell() + CoreHelper.getRandomFromChanell() + CoreHelper.getRandomFromChanell();
    },

    convertToHex(num) {
        let hex = num.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },

    repeatIt(counter, action) {
        for (let i = 0; i < counter; i++) {
            action.call();
        }
    },

    increment(startData, length) {
        let counter = startData;
// =>
        return function() {
            if (counter > length - 1) {
                counter = 0;
            }

            return counter++;
        }
    },

    decrement(startData, length) {
        let counter = startData;

        return function() {
            if (counter < 0) {
                counter = length - 1;
            }

            return counter--;
        }
    }

}

module.exports = CoreHelper;
