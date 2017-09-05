require('tap').mochaGlobals()
const { expect } = require('chai');

const Spy = require('./Spy');

describe('Spy', () => {
    it('should do stuff', () => {
        const spy = new Spy();
        expect(spy.called.length).to.equal(0);

        spy();
        expect(spy.called.length).to.equal(1);
        expect(spy.called[0].length).to.equal(0);

        spy(1, 2, 3);
        expect(spy.called.length).to.equal(2);
        expect(spy.called[1]).to.deep.equal([1, 2, 3]);
    });
});
