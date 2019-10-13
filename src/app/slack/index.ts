import express from 'express';
import {getAuthorizeUrl, authorizeSlackAccess} from './logics';

const router = express.Router();

router.get('/install', (req, res, next) => {
  const url = getAuthorizeUrl();
  return res.redirect(url);
});

router.get('/authorize', async (req, res, next) => {
  const {code, state} = req.query;
  return res.send('ok');
});

export {router as slack};
