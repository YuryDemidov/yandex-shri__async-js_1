import chai, { assert } from 'chai/index.mjs';
import promiseAllSettled from './promiseAllSettled.js';
import timeoutPromise from './util.js';
import spies from 'chai-spies/index.js';

chai.use(spies);

describe('Promise.allSettled implementation', () => {
  it('Should return a promise', () => {
    assert.typeOf(promiseAllSettled([timeoutPromise(1)]).then, 'function');
  });

  it('Should resolve to array of each promise\'s result', done => {
    promiseAllSettled([
      timeoutPromise(1),
      timeoutPromise(2),
      timeoutPromise(3)
    ]).then(value => {
      assert.deepEqual(value[0], { status: 'fulfilled', value: 1 });
      assert.deepEqual(value[1], { status: 'fulfilled', value: 2 });
      assert.deepEqual(value[2], { status: 'fulfilled', value: 3 });
      done();
    });
  });

  it('Should wait all to settle even when error occurs', done => {
    const success = chai.spy('success');
    const error = chai.spy('error');

    promiseAllSettled([
      timeoutPromise(1),
      timeoutPromise(null, 2, 50),
      timeoutPromise(null, 3, 200),
      timeoutPromise(3, null, 220)
    ]).then(success, error);

    setTimeout(() => {
      assert.strictEqual(error.__spy.called, false);

      const successCallResults = success.__spy.calls;
      assert.strictEqual(successCallResults.length, 1);

      const successResult = successCallResults[0][0];
      assert.deepEqual(successResult, [
        { status: 'fulfilled', value: 1 },
        { status: 'rejected', reason: 2 },
        { status: 'rejected', reason: 3 },
        { status: 'fulfilled', value: 3 }
      ]);

      done();
    }, 500);
  });

  it('With empty array should be resolved with an empty array', done => {
    promiseAllSettled([]).then(value => {
      assert.deepEqual(value, []);
      done();
    });
  });

  it('Should work properly in the case with non-promise values and resolved promise', done => {
    promiseAllSettled([1, 2, 3, Promise.resolve(4)])
      .then(value => {
        assert.deepEqual(value, [
          { status: 'fulfilled', value: 1 },
          { status: 'fulfilled', value: 2 },
          { status: 'fulfilled', value: 3 },
          { status: 'fulfilled', value: 4 }
        ]);
        done();
      }
    );
  });

  it('Should work properly in the case with non-promise values and rejected promise', done => {
    promiseAllSettled([1, 2, 3, Promise.reject('error')])
      .then(value => {
        assert.deepEqual(value, [
          { status: 'fulfilled', value: 1 },
          { status: 'fulfilled', value: 2 },
          { status: 'fulfilled', value: 3 },
          { status: 'rejected', reason: 'error' }
        ]);
        done();
      }
    );
  });
});
