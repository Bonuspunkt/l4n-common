require('tap').mochaGlobals();
const { expect } = require('chai');

const Resolver = require('./Resolver');

describe('Resolver', () => {
    it('should work', () => {
        const { register, resolve } = new Resolver();

        register('1', () => 1);
        register('2', resolve => resolve('1') + resolve('1'));
        register('3', resolve => resolve('2') + resolve('1'));

        expect(resolve('1')).to.equal(1);
        expect(resolve('2')).to.equal(2);
        expect(resolve('3')).to.equal(3);
    });

    it('should throw when factory is not a function', () => {
        const { register } = new Resolver();
        expect(() => register('should', 1)).to.throw();
    });

    it('should throw when it cant be resolved', () => {
        const { resolve } = new Resolver();
        expect(() => resolve('throw')).to.throw();
    });

    it('should be able to override', () => {
        const { register, resolve } = new Resolver();

        register('1', () => '1');
        register('1', () => 1);

        expect(resolve('1')).to.equal(1);
    });
});
