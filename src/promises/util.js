export default function timeoutPromise(value, reason, timeout) {
    if (timeout === void 0) { timeout = 0; }
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (reason === null || reason === undefined) {
                resolve(value);
            }
            else {
                reject(reason);
            }
        }, timeout);
    });
}
