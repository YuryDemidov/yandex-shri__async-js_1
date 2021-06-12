Promise.prototype._finally = promiseFinally;
export default function promiseFinally(onFinally) {
    return this.then(function (value) { return Promise.resolve(onFinally()).then(function () { return value; }); }, function (reason) { return Promise.resolve(onFinally()).then(function () { throw reason; }); });
}
