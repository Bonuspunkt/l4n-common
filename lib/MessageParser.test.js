require('tap').mochaGlobals()
const { expect } = require('chai');

const Spy = require('./Spy')
const MessageParser = require('./MessageParser');

describe('MessageParser', () => {

    it('simple', () => {
        const parser = new MessageParser();

        const spy = new Spy();
        parser.on('status', spy);

        parser.write('status\n');

        expect(spy.called.length).to.equal(1);
        const [args] = spy.called;
        expect(args.length).to.equal(0);

        parser.write('status\n');
        expect(spy.called.length).to.equal(2);
    });


    it('complex', () => {
        const parser = new MessageParser();

        const spy = new Spy();
        parser.on('event', spy);

        const object1 = { test: 'successful' };

        parser.write('event ');
        parser.write(JSON.stringify(object1));
        parser.write('\n');

        expect(spy.called.length).to.equal(1);

        const object2 = { moreTest: true };

        parser.write('event ');
        parser.write(JSON.stringify(object2));
        parser.write('\n');

        expect(spy.called.length).to.equal(2);

        const [args1, args2] = spy.called;
        expect(args1).to.deep.equal([object1]);
        expect(args2).to.deep.equal([object2]);
    });
})
