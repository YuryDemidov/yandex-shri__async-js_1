import reduce from './reduce.js';

const a = new Homework.AsyncArray([1, 2, 3]);

console.log('Функция reduce для AsyncArray')
reduce(
  a,
  (acc, cur, idx, src) => {
    acc += cur + idx - 1;
    src.print();
    return acc;
  },
  0,
  result => console.log(result)
);
