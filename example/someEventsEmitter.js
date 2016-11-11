'use strict';

const EventsEmitter = require('events');

exports.getSomethingAsync = () => {
  return new EventsEmitter();
};
