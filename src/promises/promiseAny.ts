// @ts-ignore
Promise._any = promiseAny;

export default function promiseAny(values: readonly any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    const errors: any[] = [];

    for (let i = 0; i < values.length; i++) {
      const promise = values[i] instanceof Promise ? values[i] : Promise.resolve(values[i]);
      promise
        .then((value: any) => resolve(value))
        .catch((reason: any) => {
          errors[i] = reason;
        })
        .finally(() => {
          if (errors.length === values.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        })
    }
  });
}
