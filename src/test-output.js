import reduce from './reduce.js';

console.log('reduce function for AsyncArray');

console.log('START Total numbers sum reducer');
const arr1 = new Homework.AsyncArray([1, 2, 3]);
reduce(
  arr1,
  (acc, cur, idx, src) => {
    if (src instanceof Homework.AsyncArray) {
      acc += cur + idx - 1;
    }
    return acc;
  },
  0,
  result => {
    console.log(`END Total numbers sum reducer: ${result}`)
  }
);

console.log('START String concatenation reducer');
const arr2 = new Homework.AsyncArray('Hello'.split(''));
reduce(
  arr2,
  (acc, cur) => {
    acc += `${cur}-`;
    return acc;
  },
  '-',
  result => {
    console.log(`END String concatenation reducer: ${result}`)
  }
);

console.log('START Array-to-array reducer');
const arr3 = new Homework.AsyncArray([1, true, 'hello', [1]]);
reduce(
  arr3,
  (acc, cur) => {
    acc.push(typeof cur === 'string' ? cur : JSON.stringify(cur));
    return acc;
  },
  [],
  result => {
    console.log(`END Array-to-array reducer: ${result}`)
  }
);

console.log('START Empty array');
const arr4 = new Homework.AsyncArray([]);
reduce(
  arr4,
  (acc, cur) => {
    return acc += cur;
  },
  0,
  result => {
    console.log(`END Empty array: ${result}`)
  }
);

fetch('/test-output.js')
  .then(response => response.text())
  .then(data => document.querySelector('#output').textContent = data);
