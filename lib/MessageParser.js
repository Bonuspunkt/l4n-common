const debug = require('debug')('l4n:common:messageParser');
const { Writable } = require('stream');

const split = '\n';
const space = ' ';

class MessageParser extends Writable {
    constructor(...args) {
        super(...args);

        this.buffer = Buffer.from([]);
    }

    _write(chunk, encoding, callback) {
        const splitIndex = chunk.indexOf(split);
        if (splitIndex === -1) {
            this.buffer = Buffer.concat([this.buffer, chunk]);
        } else {
            const line = Buffer.concat([this.buffer, chunk], this.buffer.length + splitIndex);

            const spaceIndex = line.indexOf(space);
            if (spaceIndex === -1) {
                const eventName = line.toString();
                debug(eventName);
                this.emit(eventName);
            } else {
                const eventName = line.slice(0, spaceIndex).toString();
                const data = JSON.parse(line.slice(spaceIndex + 1));
                debug(eventName, data);
                this.emit(eventName, data);
            }

            this.buffer = chunk.slice(splitIndex + 1);
        }
        callback();
    }
}

module.exports = MessageParser;
