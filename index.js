'use strict';

const Promise = require('any-promise');

function addHandlers(emitter, handlers) {
  handlers.forEach((handler, event) => {
    emitter.on(event, handler);
  });
}

function removeHandlers(emitter, handlers) {
  handlers.forEach((handler, event) => {
    emitter.removeListener(event, handler);
  });
}

module.exports = function eventToAnyPromise(emitter, successEvent, errorEvent = 'error') {
  // Once an event is submit remove the handlers os that Promise's resolve/reject won't be
  // called one the Promise is already complet or failed.
  return new Promise((resolve, reject) => {
    const handlers = new Map([
      [successEvent, (...args) => {
        removeHandlers(emitter, handlers);
        // returns zero, one or an array of parameters
        const promiseResult = args.length <= 1 ? args[0] : args;
        resolve(promiseResult);
      }],
      [errorEvent, (err) => {
        removeHandlers(emitter, handlers);
        reject(err);
      }],
    ]);
    addHandlers(emitter, handlers);
  });
};
