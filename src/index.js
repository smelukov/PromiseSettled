/**
 * @licence
 * @author Sergey Melyukov 2016
 */

/**
 * Waiting while all promises will be settled to onFulfilled or onRejected state
 * Returned promise will be resolved with array with info for every passed promise:
 * Array<{status:boolean, value:*}>
 *
 * onProgress-function will be called (if passed) for every settled promise
 *
 * @param {Array<Promise>} promises
 * @param {function({status:boolean, value:*})=} onProgress
 *
 * @return {Promise}
 */
function allSettled(promises, onProgress) {
    var status = {total: promises.length, resolved: 0, rejected: 0};
    var mapped = promises.map(function(promise) {
        return promise.then(function(value) {
            return {
                value: value,
                status: true
            };
        }, function(e) {
            return {
                value: e,
                status: false
            };
        }).then(function(value) {
            if (typeof onProgress === 'function') {
                if (value.status) {
                    status.resolved++;
                } else {
                    status.rejected++;
                }
                onProgress(value, {
                    total: status.total,
                    resolved: status.resolved,
                    rejected: status.rejected
                });
            }

            return value;
        });
    });

    return Promise.all(mapped);
}

module.exports = allSettled;
