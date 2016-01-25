/**
 * @licence
 * @author Sergey Melyukov 2016
 */

(function() {
	/**
	 * Inject method with name `extName` to `PromiseConstructor`
	 *
	 * @param {Function|String=} PromiseConstructor which constructor should be extended
	 *                           If not defined, then default promise-constructor will be used
	 * @param {String=} extName name of the method. If not defined, then 'allSettled' will be used
	 *
	 * @returns {Function}
	 *
	 * @throws {Error}
	 */
	function inject(PromiseConstructor, extName) {
		if (typeof PromiseConstructor === 'string') {
			extName = PromiseConstructor;
		}

		extName = typeof extName === 'string' ? extName : 'allSettled';

		PromiseConstructor =
			(typeof PromiseConstructor === 'function' && PromiseConstructor) ||
			(typeof Promise === 'function' && Promise) || null;

		if (!PromiseConstructor) {
			throw new Error('Wrong constructor is passed or browser doesn\'t support promises');
		}

		/**
		 * Waiting while all promises will be settled to onFulfilled or onRejected state
		 * Returned promise will be resolved with array with info for every passed promise:
		 * Array<{status:boolean, value:*}>
		 *
		 * onProgress-function will be called (if passed) for every settled promise
		 *
		 * @param {Array<Promise>} promises
		 * @param {function({status:boolean, value:*})} onProgress
		 *
		 * @return {Promise}
		 */
		PromiseConstructor[extName] = function(promises, onProgress) {
			promises = promises.map(function(promise) {
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
					if (onProgress instanceof Function) {
						onProgress(value);
					}

					return value;
				});
			});

			return Promise.all(promises);
		};

		return PromiseConstructor;
	}

	var root = (typeof self == 'object' && self.self === self && self) ||
		(typeof global == 'object' && global.global === global && global);

	if (typeof define === 'function' && define.amd) {
		define(function() {
			return inject;
		});
	} else if (typeof module === 'object' && module && module.exports) {
		module.exports = inject;
	} else {
		root.PromiseSettled = inject;
	}
})();
