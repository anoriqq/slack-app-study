import express from 'express';
import debug from 'debug';
import {getAuthorizeUrl, authorizeSlackAccess} from './logics';

const router = express.Router();
const log = debug('app:slack:router');

router.get('/install', (req, res, next) => {
  const url = getAuthorizeUrl();
  log(url);
  return res.redirect(url);
});

router.get('/authorize', async (req, res, next) => {
  log(req.query);
  const {code, state} = req.query;
  const accessToken = await authorizeSlackAccess(code).catch(next);
  return res.redirect('/');
});

export {router as slack};
