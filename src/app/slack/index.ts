import express from 'express';
import * as logics from './logics';

const router = express.Router();

router.get('/install', (req, res, next)=>{
  const url = logics.getAuthorizeUrl();
  return res.redirect(url)
});

router.get('/authorize', async (req, res, next)=>{
  const {code, state} = req.query;
  const accessToken = await logics.exchangeAuthorizationCode({code, state});
  return res.status(200).send(accessToken);
  const url = logics.getExchangeAuthorizationCodeUrl({code, state});
  return res.redirect(url);
});

export {router as slack};
