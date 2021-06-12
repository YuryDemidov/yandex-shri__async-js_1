import chai, { assert } from 'chai/index.mjs';
import promiseFinally from './promiseFinally.js';
import timeoutPromise from './util.js';
import spies from 'chai-spies/index.js';

Promise.prototype._finally = promiseFinally;
chai.use(spies);

describe('Promise.prototype.finally implementation', () => {
  it('Should be called when fulfilled', done => {
    Promise.resolve(1)
      ._finally(() => {
        done();
      });
  });

  it('Should be called when rejected', done => {
    Promise.reject(1)
      ._finally(() => {
        done();
      });
  });

  it('Should not alter the fulfilled value', done => {
    const onFinally = chai.spy('onFinally');

    Promise.resolve(100)
      ._finally(() => {
        onFinally();
        return 1;
      })
      .then(value => {
        assert.strictEqual(value, 100);
        assert.strictEqual(onFinally.__spy.called, true);
        done();
      });
  });

  it('Should not alter the rejection reason', done => {
    const onFinally = chai.spy('onFinally');

    Promise.reject(100)
      ._finally(() => {
        onFinally();
        return 1;
      })
      .catch(error => {
        assert.strictEqual(error, 100);
        assert.strictEqual(onFinally.__spy.called, true);
        done();
      });
  });

  it('Should not alter the fulfilled value with promise', done => {
    const onFinally = chai.spy('onFinally');

    Promise.resolve(100)
      ._finally(() => {
        onFinally();
        return Promise.resolve(200);
      })
      .then(value => {
        assert.strictEqual(value, 100);
        assert.strictEqual(onFinally.__spy.called, true);
        return Promise.resolve(300);
      })
      .then((value) => {
        assert.strictEqual(value, 300);
        done();
      });
  });

  it('If returns promise, it should be waited', done => {
    const res = [];

    Promise.resolve(100)
      ._finally(() => {
        res.push(1);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            res.push(2);
            resolve(1);
          }, 100);
        });
      })
      .then(value => {
        assert.strictEqual(value, 100);
        res.push(3);
      })
      .then(() => {
        assert.deepEqual(res, [1, 2, 3]);
        done();
      });
  });

  it('If rejects promise, it should be waited and used', done => {
    const res = [];

    Promise.reject(100)
      ._finally(() => {
        res.push(1);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            res.push(2);
            reject(4);
          }, 100);
        });
      })
      .then(() => {
        res.push(3);
      })
      .catch(error => {
        assert.deepEqual(res, [1, 2]);
        assert.strictEqual(error, 4);
        done();
      });
  });

  it('Throwing an error should lead to rejection', done => {
    const onFinally = chai.spy('onFinally');

    Promise.resolve(100)
      ._finally(() => {
        onFinally();
        throw 'error';
      })
      .catch(error => {
        assert.strictEqual(error, 'error');
        assert.strictEqual(onFinally.__spy.called, true);
        done();
      });
  });
});
