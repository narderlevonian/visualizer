const tool = {
	repeat: function (times, callback) {
		for (let i = 0; i < times; i++) {
			callback.call();
		}
	}
};

module.exports = tool;