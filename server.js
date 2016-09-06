/**
 * Created by jmeo on 16/9/6.
 */

var app = require('./src/app');

var http = require('http');

var config = {};

var port = config.port ? config.port : 3000;

http.createServer(app.callback()).listen(port);

console.log('server started and listening on : http://localhost:'+port+"/");