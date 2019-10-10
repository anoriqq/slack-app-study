import {Request, Response, NextFunction} from 'express'

export function notFoundError(req: Request, res: Response, next: NextFunction){
  res.status(404);

  // respond with json
  if (req.accepts('json')) {
    return res.send({error: 'Not found', message: 'ページが見つかりません'});
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
}
