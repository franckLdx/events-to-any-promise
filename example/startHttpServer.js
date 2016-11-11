'use strict';

const http = require('http');
const eventToAnyPromise = require('../index'); // in real life: require('events-to-any-promise');

function initHttpServer(config) {
  const server = http.createServer();
  server.listen(config);
  return eventToAnyPromise(server, 'listening').then(() => server);
}

/* eslint no-console: "off" */
initHttpServer({ port: 80 })
  .then((server) => {
    console.log('Http server is listening on ', server.address());
  })
  .catch((err) => {
    console.log('Failed to start the server', err);
  });
