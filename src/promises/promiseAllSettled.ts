// @ts-ignore
Promise._allSettled = promiseAllSettled;

export default function promiseAllSettled(values: readonly any[]): Promise<PromiseSettledResult<any>[]> {
  return new Promise(resolve => {
    const result: PromiseSettledResult<any>[] = [];

    if (values.length === 0) {
      resolve(result);
    }

    for (let i = 0; i < values.length; i++) {
      const promise = values[i] instanceof Promise ? values[i] : Promise.resolve(values[i]);
      promise
        .then((value: any) => {
          result[i] = {
            status: 'fulfilled',
            value
          }
        })
        .catch((reason: any) => {
          result[i] = {
            status: 'rejected',
            reason
          }
        })
        .finally(() => {
          if (i === values.length - 1) {
            resolve(result);
          }
        });
    }
  });
}
