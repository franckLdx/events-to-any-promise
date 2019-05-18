# event-to-any-promise

> Create a promise waiting for events to be resolve/reject. Uses any-promise to create the promise

## Install
```
npm install --save events-to-any-promise
```
**_You must have any-promise 1.x in your dependencies._**

## Example
Using a promise to start Node Http Server:
```
'use strict';

const http = require('http');
const eventToAnyPromise = require('events-to-any-promise');

async function initHttpServer(config) {
  const server = http.createServer();
  server.listen(config);
  await eventToAnyPromise(server, 'listening');
  return server;
}


initHttpServer({ port: 80 })
  .then((server) => {
    console.log('Http server is listening on ', server.address());
  })
  .catch((err) => {
    console.log('Failed to start the server', err);
  });
```

## Usage
Call events-to-any-promise to wait for a success event (this throws en error in case of error event):
```
const require('events-to-any-promise');
const someEventsEmitter = require('./someEventsEmitter');

async function doSomething() {
  await eventToAnyPromise(someEventsEmitter, 'sucess');
  // some stuff
}
```
When the success event returns a value:
```
const require('events-to-any-promise');
const someEventsEmitter = require('./someEventsEmitter');

async function doSomething() {
  const result = eventToAnyPromise(someEventsEmitter, 'sucess');
}
```
When the success event delivers multiples values, eventToAnyPromise returns an array:
```
const require('events-to-any-promise');
const someEventsEmitter = require('./someEventsEmitter');

async function doSomething() {
  const results = await eventToAnyPromise(someEventsEmitter, 'sucess');
  // results is an array
}
```
Be default, eventToAnyPromise uses 'error' as error event. To use another event
as error event, simply pass it as 3rd parameters:
```
const require('events-to-any-promise');
const someEventsEmitter = require('./someEventsEmitter');

async function doSomething() {
  await eventToAnyPromise(someEventsEmitter, 'sucess', 'errorEvent');
  // some stuff
}
```

## API
> Returns a promise. The promise is resolve when sucessEvent is emitted
> and rejected when errorEvent is emitted.

eventToAnyPromise(emitter, successEvent, [errorEvent]) ==> Promise

**emitter**
The events emitters object

**successEvent**
The name of the success event

**errorEvent**
The name of the error event. Optional, by default: 'error'.

### Promise
The promise is build using [any-promise](https://www.npmjs.com/package/any-promise),
therefore it can be used with any Promise implementation.

## Restrictions:
Requires Node 6.0.0 or upper.

## License
MIT
