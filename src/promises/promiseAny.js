Promise._any = promiseAny;
export default function promiseAny(values) {
    return new Promise(function (resolve, reject) {
        var errors = [];
        var _loop_1 = function (i) {
            var promise = values[i] instanceof Promise ? values[i] : Promise.resolve(values[i]);
            promise
                .then(function (value) { return resolve(value); })
                .catch(function (reason) {
                errors[i] = reason;
            })
                .finally(function () {
                if (errors.length === values.length) {
                    reject(new AggregateError(errors, 'All promises were rejected'));
                }
            });
        };
        for (var i = 0; i < values.length; i++) {
            _loop_1(i);
        }
    });
}
