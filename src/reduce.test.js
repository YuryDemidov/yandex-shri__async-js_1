import { assert } from 'chai/index.mjs';
import reduce from './reduce.js';
import './shri-async-hw.js'; // imports globalThis.Homework

describe('reduce function for AsyncArray', () => {
  describe('Base function usage', () => {
    it('Total numbers sum reducer', done => {
      const arr = new Homework.AsyncArray([1, 2, 3]);
      reduce(
        arr,
        (acc, cur, idx, src) => {
          if (src instanceof Homework.AsyncArray) {
            acc += cur + idx - 1;
          }
          return acc;
        },
        0,
        result => {
          assert.strictEqual(result, 6);
          done();
        }
      );
    });

    it('String concatenation reducer', done => {
      const arr = new Homework.AsyncArray('Hello'.split(''));
      reduce(
        arr,
        (acc, cur) => {
          acc += `${cur}-`;
          return acc;
        },
        '-',
        result => {
          assert.strictEqual(result, '-H-e-l-l-o-');
          done();
        }
      );
    });

    it('Array-to-array reducer', done => {
      const arr = new Homework.AsyncArray([1, true, 'hello', [1]]);
      reduce(
        arr,
        (acc, cur) => {
          acc.push(typeof cur === 'string' ? cur : JSON.stringify(cur));
          return acc;
        },
        [],
        result => {
          assert.deepEqual(result, ['1', 'true', 'hello', '[1]']);
          done();
        }
      );
    });
  });

  describe('Edge cases', () => {
    it('Empty array', done => {
      const arr = new Homework.AsyncArray([]);
      reduce(
        arr,
        (acc, cur) => {
          return acc += cur;
        },
        0,
        result => {
          assert.deepEqual(result, 0);
          done();
        }
      );
    });
  });
});
