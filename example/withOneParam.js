'use strict';

const eventToAnyPromise = require('../index'); // in real life: require('events-to-any-promise');
const someEventsEmitter = require('./someEventsEmitter');

async function doSomething() {
  const result = await eventToAnyPromise(someEventsEmitter, 'sucess');
}
