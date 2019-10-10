// import {WebClient} from '@slack/web-api';
import request from 'request-promise-native';

// import ky from 'ky';

const SLACK_CLIENT_ID = '353190391027.786804600948';

export function getAuthorizeUrl(): string{
  const scope = ['incoming-webhook'];
  const redirect_uri = 'http://localhost:8080/slack/authorize';
  // const now = Date.now();
  // const state = {
  //   now,
  //   i: userId,
  // }
  // ${JSON.stringify(state)}

  return `https://slack.com/oauth/authorize?scope=${scope.join(' ')}&client_id=${SLACK_CLIENT_ID}&redirect_uri=${redirect_uri}&state=`;
}

export async function exchangeAuthorizationCode({code, state}: {code: string, state: string}){
  const SLACK_CLIENT_SECRET = '6904db9966b9debf2af772efcaec118a';
  const body = {
    client_id: SLACK_CLIENT_ID,
    client_secret: SLACK_CLIENT_SECRET,
    code,
  };
  const options = {
    method: 'POST',
    url: 'https://slack.com/api/oauth.access?client_id=${SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&code=${code}&redirect_uri=http://localhost:8080/slack/authorize',
    body,
    json: true,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },  
  };

  return await request(options);
}

export function getExchangeAuthorizationCodeUrl({code, state}: {code: string, state: string}){
  const SLACK_CLIENT_SECRET = '6904db9966b9debf2af772efcaec118a';

  return `https://slack.com/api/oauth.access?client_id=${SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&code=${code}&redirect_uri=http://localhost:8080/slack/authorize`
}
