// import {WebClient} from '@slack/web-api';
// import ky from 'ky';
// import request from 'request-promise-native';
import debug from 'debug';
import {AxiosResponse} from 'axios';

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

const log = debug('app:slack:logic');

const SLACK_CLIENT_ID = '353190391027.786804600948';
const SLACK_OAUTH_REDIRECT_URI = 'http://localhost:8080/slack/authorize';

export function getAuthorizeUrl(): string {
  const scopes = ['incoming-webhook'];
  const scope = scopes.join(' ');
  const apiMethodUrl = 'https://slack.com/oauth/authorize';

  return `${apiMethodUrl}?scope=${scope}&client_id=${SLACK_CLIENT_ID}&redirect_uri=${SLACK_OAUTH_REDIRECT_URI}`;
}

import axios from 'axios';
export async function authorizeSlackAccess(code: string) {
  const url = 'https://slack.com/api/oauth.access';
  const client_secret = '6904db9966b9debf2af772efcaec118a';
  const data = {
    client_id: SLACK_CLIENT_ID,
    client_secret,
    code,
    redirect_uri: SLACK_OAUTH_REDIRECT_URI,
  };
  log(data);
  const res = await _timeoutPost(url, data, 10000);
  log(res.data);
  return res.data;
}

function _timeoutPost(
  url: string,
  data: object,
  ms: number,
): Promise<AxiosResponse> {
  return new Promise<AxiosResponse>((resolve, reject) => {
    setTimeout(async () => {
      const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      };
      const res = await axios.post(url, data, config).catch(err => {
        return reject(err);
      });
      return resolve(res);
    }, ms);
  });
}
