import * as express from 'express';
import * as http from 'http';
import * as path from 'path';

const config: any = require('./config.json');

const app = express();
app.use(express.static(path.resolve(__dirname, 'static')));

const appPort = config.server.port;
const logMsg = `Rectamble server listening on :${appPort}`;
http.createServer(app).listen(appPort, () => console.log(logMsg));
