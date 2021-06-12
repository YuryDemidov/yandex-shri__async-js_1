import chai, { assert } from 'chai/index.mjs';
import promiseAny from './promiseAny.js';
import timeoutPromise from './util.js';
import spies from 'chai-spies/index.js';

chai.use(spies);

describe('Promise.any implementation', () => {
  it('Should return a promise', () => {
    assert.typeOf(promiseAny([timeoutPromise(1)]).then, 'function');
  });

  it('Should resolve to the first fulfilled', done => {
    promiseAny([
      timeoutPromise(1, null, 100),
      timeoutPromise(2, null, 10),
      timeoutPromise(3, null, 200)
    ]).then(value => {
        assert.strictEqual(value, 2);
        done();
      }
    );
  });

  it('Should ignore the error if some are fulfilled', done => {
    const success = chai.spy('success');
    const error = chai.spy('error');
    promiseAny([
      timeoutPromise(1, null, 150),
      timeoutPromise(null, 2, 50),
      timeoutPromise(null, 3, 200),
      timeoutPromise(3, null, 220)
    ]).then(success, error);
    setTimeout(() => {
      assert.strictEqual(error.__spy.called, false);

      const successCallResults = success.__spy.calls;
      assert.strictEqual(successCallResults.length, 1);

      const successResult = successCallResults[0][0];
      assert.strictEqual(successResult, 1);

      done();
    }, 500);
  });

  it('Should reject if no promise is fulfilled', done => {
    const success = chai.spy('success');
    const error = chai.spy('error');
    promiseAny([
      timeoutPromise(null, 'error1', 50),
      timeoutPromise(null, 'error2', 200),
      timeoutPromise(null, 'error3', 220)
    ]).then(success, error);
    setTimeout(() => {
      assert.strictEqual(success.__spy.called, false);

      const errorCallResults = error.__spy.calls;
      assert.strictEqual(errorCallResults.length, 1);

      const errorResult = errorCallResults[0][0];
      assert.instanceOf(errorResult, AggregateError);
      assert.deepEqual(errorResult.errors, ['error1', 'error2', 'error3']);

      done();
    }, 500);
  });
});
