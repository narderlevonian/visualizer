const CoreMarkupHelper = {
    create: function(tag) {
        return document.createElement(tag);
    },

    appendTo: function(parent, child) {
        return document.querySelector(parent).appendChild(child);
    },

    getContent: function(id) {
        return document.querySelector(id).innerHTML;
    },

    setContent: function(element, html) {
        element.innerHTML = html;
    },

    getElement: function(element) {
        return document.querySelectorAll(element);
    },

    onClick: function(element, callback) {
        element.addEventListener('click', callback.bind());
    },

    setMixMode: function(element, mode) {
        document.querySelector(element).style.mixBlendMode = mode;
    },

    setBackground: function(element, background) {
        element.style.background = background;
    },

    setSize: function(element, width, height) {
        element.style.width = width;
        element.style.height = height;
    },

    setAlpha: function(element, opacity) {
        element.style.opacity = opacity;
    },

    setDisabled: function(element, isTrue) {
        document.querySelectorAll(element).disabled = isTrue;
    },

    countChild: function(element) {
        return document.querySelector(element).childElementCount;
    },

    hasChild: function(element) {
        if (document.querySelector(element).childElementCount != 0) {
            return true
        } else {
            return false
        }
    },

    remove: function(element) {
        // document.querySelectorAll(element).removeAll();
    }
}

module.exports = CoreMarkupHelper;
