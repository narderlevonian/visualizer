class DataSwitch {
    constructor(data, pointer) {
        this.list = data;
        this.length = data.length;
        this.pointer = pointer;
    }

    next() {
        (this.pointer == this.length - 1) ? this.pointer = 0: this.pointer++;           // If () jkjkj else kjjkjk
        return this.list[this.pointer];
    }

    current() {
        return this.list[this.pointer];
    }
}

module.exports = DataSwitch;
