Promise._allSettled = promiseAllSettled;
export default function promiseAllSettled(values) {
    return new Promise(function (resolve) {
        var result = [];
        if (values.length === 0) {
            resolve(result);
        }
        var _loop_1 = function (i) {
            var promise = values[i] instanceof Promise ? values[i] : Promise.resolve(values[i]);
            promise
                .then(function (value) {
                result[i] = {
                    status: 'fulfilled',
                    value: value
                };
            })
                .catch(function (reason) {
                result[i] = {
                    status: 'rejected',
                    reason: reason
                };
            })
                .finally(function () {
                if (i === values.length - 1) {
                    resolve(result);
                }
            });
        };
        for (var i = 0; i < values.length; i++) {
            _loop_1(i);
        }
    });
}
