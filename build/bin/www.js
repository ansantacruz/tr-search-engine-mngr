#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const debug_1 = __importDefault(require("debug"));
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("../app"));
const database_1 = require("../database/database");
const debug = (0, debug_1.default)('bdb:server');
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '9036');
app_1.default.set('port', port);
debug('Port set to:', port);
/**
 * Create HTTP server.
 */
const server = http_1.default.createServer(app_1.default);
debug('Server created');
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const nPort = parseInt(val, 10);
    if (isNaN(nPort)) {
        return val;
    }
    if (nPort >= 0) {
        return nPort;
    }
    return false;
}
/**
 * Event listener for HTTP server 'error' event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;
    // handle specific listen errors with friendly message
    switch (error.code) {
        case 'EACCES':
            debug(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            debug(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server 'listening' event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
/**
 * Validate the connection with the database using the ORM
 */
database_1.sequelizeMySQL
    .authenticate()
    .then()
    .catch((err) => {
    debug('Unable to connect to the database:', err);
});
//# sourceMappingURL=www.js.map