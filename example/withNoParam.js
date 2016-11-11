'use strict';

const eventToAnyPromise = require('../index'); // in real life: require('events-to-any-promise');
const someEventsEmitter = require('./someEventsEmitter');

eventToAnyPromise(someEventsEmitter, 'sucess').then(() => {
  // some stuff
});
