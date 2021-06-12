import './shri-async-hw.js';

interface AddFunc {
  (a: Number, b: Number, cb: (result: Number) => void): void;
}
interface SubtractFunc {
  (a: Number, b: Number, cb: (result: Number) => void): void;
}
interface lessOrEqualFunc {
  (a: any, b: any, cb: (result: Boolean) => void): void;
}
interface AsyncArray {
  set(index: Number, value: any, cb: () => void): void;
  push(value: any, cb: () => void): void;
  get(index: Number, cb: (result: any) => void): void;
  pop(cb: (result: any) => void): void;
  length(cb: (result: Number) => void): void;
  print(): void,
  [Symbol.asyncIterator](): AsyncIterator<AsyncArrayIteratorResult>
}
interface AsyncArrayIteratorResult {
  value: any,
  index: Number
}

const {
  add,
  subtract,
  lessOrEqual
}: {
  add: AddFunc,
  subtract: SubtractFunc,
  lessOrEqual: lessOrEqualFunc
  // @ts-ignore
} = globalThis.Homework;

export default function reduce(
  array: AsyncArray,
  fn: (acc: any, cur: any, idx: Number, src: AsyncArray) => any,
  initialValue: any,
  cb: (result: any) => void) {
  (async () => {
    const arrayLength: Number = await new Promise(resolve => {
      array.length(result => resolve(result))
    });
    const arrayLastIndex: Number = await new Promise(resolve => {
      subtract(arrayLength, 1, result => resolve(result))
    });
    let accumulator = initialValue;

    if (!array[Symbol.asyncIterator]) {
      array[Symbol.asyncIterator] = () => {
        return {
          current: 0,
          last: arrayLastIndex,

          async next() {
            const currentValue = await new Promise(resolve => array.get(this.current, result => resolve(result)));
            const isNotDone = await new Promise(resolve => lessOrEqual(this.current, this.last, result => resolve(result)));

            if (isNotDone) {
              const value: AsyncArrayIteratorResult = {
                value: currentValue,
                index: this.current
              };
              this.current = await new Promise(resolve => add(this.current, 1, result => resolve(result)));
              return {
                done: false,
                value
              };
            } else {
              return {
                done: true,
                value: undefined
              };
            }
          }
        };
      }
    }

    for await (let item of array) {
      accumulator = fn(accumulator, item.value, item.index, array);
    }

    cb(accumulator);

    return accumulator;
  })();
}
