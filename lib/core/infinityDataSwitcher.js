const CoreHelper = require('./coreHelper.js');

class InfinityDataSwitcher {
    constructor(itemsList, defaultIndex, isIncrement) {
        this.list = itemsList;
        this.size = itemsList.length;

        this.defaultIndex = defaultIndex;
        this.isIncrement = isIncrement;

        this.counter = isIncrement ? CoreHelper.increment(defaultIndex, this.size) : CoreHelper.decrement(defaultIndex, this.size);
    }

    switchNext() {
        return this.list[this.counter()];
    }
}

module.exports = InfinityDataSwitcher;
