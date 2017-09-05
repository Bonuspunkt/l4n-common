function Spy() {
    const calledArgs = [];

    const spy = function(...args) {
        calledArgs.push(args)
    };
    Object.defineProperties(spy, {
        called: {
            get: () => Array.from(calledArgs)
        }
    });

    return spy;
}

module.exports = Spy;
