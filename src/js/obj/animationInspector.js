class AnimationInspector {
    constructor(callback, interval) {
        this.callback = callback;
        this.interval = interval;

        this.animationFrame = {};
    }

    start() {
        this.timer = window.setInterval(() => {
            this.animationFrame = window.requestAnimationFrame(this.callback, this.interval);
        }, this.interval);
    }

    reset() {
        window.cancelAnimationFrame(this.animationFrame);
        window.clearInterval(this.timer);
    }
}

module.exports = AnimationInspector;
