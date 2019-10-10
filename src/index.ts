import express from 'express';
import debug from 'debug';
import {notFoundError} from './middleware';

const app = express();
const info = debug('info');

// App setup
app.set('name', 'slack-karte');
app.set('port', 8080);
app.set('view engine', 'pug');
app.set('views', `${process.cwd()}/src/views`);

// Middleware setup
import morgan from 'morgan'
app.use(morgan('dev', {stream: {write: msg=>info(msg.trimEnd())}}));

// Router setup
import {router} from './routes';
app.use(router);

// Error handler setup
app.use(notFoundError);

// Create and listen server
import {createServer} from 'http';
const server = createServer(app);
server.listen(app.get('port'), ()=>{
  info(`${app.get('name')} server is listening on port ${app.get('port')}`);
});
