'use strict';

const eventToAnyPromise = require('../index'); // in real life: require('events-to-any-promise');
const someEventsEmitter = require('./someEventsEmitter');

async function doSomething() {
  const results = await eventToAnyPromise(someEventsEmitter, 'sucess');
  // results is an array
}
