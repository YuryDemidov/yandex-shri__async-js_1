const assert = require('assert');
const reduce = require('./reduce.ts');
require('./shri-async-hw.js'); // imports globalThis.Homework

describe('reduce function for AsyncArray', function() {
  it('Base function usage', function() {
    const a = new Homework.AsyncArray([1, 2, 3]);
    assert.strictEqual(reduce(
      a,
      (acc, cur, idx, src) => {
        acc += cur + idx - 1;
        src.print();
        return acc;
      },
      0,
      result => console.log(result)
    ), 6);
  });
});
