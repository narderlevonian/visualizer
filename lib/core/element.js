const CoreMarkupHelper = require('./coreMarkupHelper.js');
const Tag = require('./tag.js');

class Element extends Tag {
    constructor(parent, name, args, content, callback) {
        super(name, args, content);

        if (callback) {
            CoreMarkupHelper.onClick(this.element, callback);
        }

        CoreMarkupHelper.appendTo(parent, this.element);
    }
}

module.exports = Element;
