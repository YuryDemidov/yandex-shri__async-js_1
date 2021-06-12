export default function timeoutPromise(value: any, reason?: any, timeout: number = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (reason === null || reason === undefined) {
        resolve(value);
      } else {
        reject(reason);
      }
    }, timeout);
  })
}
