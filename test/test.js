'use strict';

const EventsEmitter = require('events');
const should = require('chai').should();
const eventToAnyPromise = require('../index');

/* eslint func-names: "off" */
/* eslint prefer-arrow-callback: "off" */
describe('eventToAnyPromise test', function () {
  const SUCCESS_EVENT = 'yes';
  const ERROR_EVENT = 'NOOOOO';

  let emitter;
  beforeEach(function () {
    emitter = new EventsEmitter();
  });

  afterEach(function () {
    emitter.listenerCount(SUCCESS_EVENT).should.be.deep.equal(0);
    emitter.listenerCount('error').should.be.deep.equal(0);
    emitter.listenerCount(ERROR_EVENT).should.be.deep.equal(0);
  });

  describe('Success event test', function () {
    const P1 = 'p1';
    const P2 = 10;

    it('Success with no param', function () {
      const promise = eventToAnyPromise(emitter, SUCCESS_EVENT);
      setImmediate(() => { emitter.emit(SUCCESS_EVENT); });
      return promise.then((param1) => {
        should.not.exist(param1);
      });
    });

    it('Success with one param', function () {
      const promise = eventToAnyPromise(emitter, SUCCESS_EVENT);
      setImmediate(() => { emitter.emit(SUCCESS_EVENT, P1); });
      return promise.then((param1) => {
        param1.should.be.deep.equal(P1);
      });
    });

    it('Success with 2 params', function () {
      const promise = eventToAnyPromise(emitter, SUCCESS_EVENT);
      setImmediate(() => { emitter.emit(SUCCESS_EVENT, P1, P2); });
      return promise.then((params) => {
        params[0].should.be.deep.equal(P1);
        params[1].should.be.deep.equal(P2);
      });
    });
  });

  describe('Error event test', function () {
    const ERROR = new Error('no no');

    it('Standard error event', function () {
      const promise = eventToAnyPromise(emitter, SUCCESS_EVENT);
      setImmediate(() => { emitter.emit('error', ERROR); });
      return promise
        .then(() => Promise.reject(new Error('Should got an error')))
        .catch((err) => {
          err.should.be.deep.equal(ERROR);
        });
    });

    it('Customs error event', function () {
      const promise = eventToAnyPromise(emitter, SUCCESS_EVENT, ERROR_EVENT);
      setImmediate(() => { emitter.emit(ERROR_EVENT, ERROR); });
      return promise
        .then(() => Promise.reject(new Error('Should got an error')))
        .catch((err) => {
          err.should.be.deep.equal(ERROR);
        });
    });

    it('Error with no param', function () {
      const promise = eventToAnyPromise(emitter, SUCCESS_EVENT);
      setImmediate(() => { emitter.emit('error'); });
      return promise
        .then(() => Promise.reject(new Error('Should got an error')))
        .catch((err) => {
          should.not.exist(err);
        });
    });

    it('Customs error event with no param', function () {
      const promise = eventToAnyPromise(emitter, SUCCESS_EVENT, ERROR_EVENT);
      setImmediate(() => { emitter.emit(ERROR_EVENT); });
      return promise
        .then(() => Promise.reject(new Error('Should got an error')))
        .catch((err) => {
          should.not.exist(err);
        });
    });
  });
});
