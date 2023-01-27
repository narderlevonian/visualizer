const CoreMarkupHelper = require('./coreMarkupHelper.js');

class Tag {
    constructor(name, args, content) {
        this.name = name;
        this.args = args;
        this.content = content;

        this.element = this.getElement();
    }

    getElement() {
        const element = CoreMarkupHelper.create(this.name);

        for (let i in this.args) {
            element.setAttribute(i, this.args[i]);
        }

        CoreMarkupHelper.setContent(element, this.content);

        return element;
    }

}

module.exports = Tag;
