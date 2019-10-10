"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function notFoundError(req, res, next) {
    res.status(404);
    // respond with json
    if (req.accepts('json')) {
        return res.send({ error: 'Not found', message: 'ページが見つかりません' });
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
}
exports.notFoundError = notFoundError;
