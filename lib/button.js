const CoreMarkupHelper = require('./core/coreMarkupHelper.js');
const Tag = require('./core/tag.js');
const Element = require('./core/element.js');

class Button extends Element {
    constructor(parent, args, content, callback) {
        super(parent, 'button', args, content, callback);
    }
}

module.exports = Button;
