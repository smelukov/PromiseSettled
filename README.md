[![Build Status](https://travis-ci.org/smelukov/PromiseSettled.svg?branch=master)](https://travis-ci.org/smelukov/PromiseSettled)

# PromiseSettled
Simple settled promise.

### How to use it?
```javascript
var allSettled = require('promise-ext-settled');

allSettled(arrayOfPromises, onProgress)
    .then(function(promisesStatus) {
        console.log(promisesStatus)
    });
```

### What is that?
This is a realization of a small and simple allSettled promise, that supports CommonJS, AMD ang non-module definition.

allSettled promise - is the promise that will be resolved only when all of the passed promises will be settled (fulfilled or rejected).

allSettled promise will be resolved with an array of objects that contains an info (status and value) about all of the passed promise.

As well, onProgress function will be called (if passed) after any of the passed promises will be settled (resolved or rejected).

onProgress function may accept two arguments:
* object that contains an info about settled promise: status (true or false) and value (fulfilled or rejected value).
* object that contains overall execution status with following properties: total (total tasks to be executed), resolved (succeeded by now), rejected (failed by now)

### How to install it?
```shell
npm install promise-ext-settled --save
```
or
```shell
bower install promise-ext-settled --save
```

### How to build it?
```shell
gulp
```
