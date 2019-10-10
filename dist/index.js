"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var debug_1 = __importDefault(require("debug"));
var middleware_1 = require("./middleware");
var app = express_1.default();
var info = debug_1.default('info');
// App setup
app.set('name', 'slack-karte');
app.set('port', 8080);
app.set('view engine', 'pug');
app.set('views', process.cwd() + "/src/views");
// Middleware setup
var morgan_1 = __importDefault(require("morgan"));
app.use(morgan_1.default('dev', { stream: { write: function (msg) { return info(msg.trimEnd()); } } }));
// Router setup
var routes_1 = require("./routes");
app.use(routes_1.router);
// Error handler setup
app.use(middleware_1.notFoundError);
// Create and listen server
var http_1 = require("http");
var server = http_1.createServer(app);
server.listen(app.get('port'), function () {
    info(app.get('name') + " server is listening on port " + app.get('port'));
});
