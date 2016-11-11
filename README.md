# event-to-any-promise

> Create a promise waiting for events to be resolve/reject. Uses any-promise to create the promise

## Install
```
npm install --save event-to-any-promise
```

## Example
Using a pomise to start Node Http Server:
```
'use strict';

const http = require('http');
const eventToAnyPromise = require('events-to-any-promise');

function initHttpServer(config) {
  const server = http.createServer();
  server.listen(config);
  return eventToAnyPromise(server, 'listening').then(() => server);
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
Call events-to-any-promise with the success event:
```
const require('events-to-any-promise');
const someEventsEmitter = require('./someEventsEmitter');

eventToAnyPromise(someEventsEmitter, 'sucess').then(() => {
  // some stuff
});
```
When the success event returns a value:
```
const require('events-to-any-promise');
const someEventsEmitter = require('./someEventsEmitter');

eventToAnyPromise(someEventsEmitter, 'sucess').then((value) => {
  // some stuff
});
```
When the success event returns multiples values the promise returns an array:
```
const require('events-to-any-promise');
const someEventsEmitter = require('./someEventsEmitter');

eventToAnyPromise(someEventsEmitter, 'sucess').then((values) => {
  // values is an array
});
```
Be default, eventToAnyPromise uses 'error' as error event. To use another event
as error event, simply pass it as 3rd parameters:
```
const require('events-to-any-promise');
const someEventsEmitter = require('./someEventsEmitter');

eventToAnyPromise(someEventsEmitter, 'sucess', 'customErrorEvent').then(() => {
  // some stuff
});
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

## License
MIT
