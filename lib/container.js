const CoreMarkupHelper = require('./core/coreMarkupHelper.js');
const Tag = require('./core/tag.js');
const Element = require('./core/element.js');

class Container extends Element {
    constructor(parent, args) {
        super(parent, 'div', args, null, null);
    }
}

module.exports = Container;

// getelementtyupe
