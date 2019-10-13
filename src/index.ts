import express from 'express';
import debug from 'debug';

const app = express();
const log = debug('app:log');
const requestLogger = debug('request');

// App setup
app.set('name', 'slack-karte');
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'pug');
app.set('views', `${process.cwd()}/src/views`);

// Middleware setup
import morgan from 'morgan';
import helmet from 'helmet';
app.use(morgan('dev', {stream: {write: msg => requestLogger(msg.trimEnd())}}));
app.use(helmet());

// Router setup
import {router} from './routes';
app.use(router);

// Error handler setup
import {notFoundError} from './middleware';
app.use(notFoundError);

// Create and listen server
import {createServer} from 'http';
const server = createServer(app);
server.listen(app.get('port'), () => {
  log(`${app.get('name')} server is listening on port ${app.get('port')}`);
});
