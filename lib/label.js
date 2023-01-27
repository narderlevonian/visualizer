const CoreMarkupHelper = require('./core/coreMarkupHelper.js');
const Tag = require('./core/tag.js');
const Element = require('./core/element.js');

class Label extends Element {
    constructor(parent, args, content) {
        super(parent, 'p', args, content, null);
    }
}

module.exports = Label;
