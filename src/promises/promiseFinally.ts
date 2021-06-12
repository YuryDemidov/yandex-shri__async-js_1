// @ts-ignore
Promise.prototype._finally = promiseFinally;

export default function promiseFinally(onFinally?: (() => void) | undefined | null): Promise<any> {
  return this.then(
    (value: any) => Promise.resolve(onFinally()).then(() => value),
    (reason: any) => Promise.resolve(onFinally()).then(() => { throw reason })
  )
}
