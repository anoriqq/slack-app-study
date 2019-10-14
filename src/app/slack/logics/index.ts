import debug from 'debug';

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
  const methodUrl = 'https://slack.com/api/oauth.access';
  const client_secret = '6904db9966b9debf2af772efcaec118a';
  const data = {
    client_id: SLACK_CLIENT_ID,
    client_secret,
    code,
    redirect_uri: SLACK_OAUTH_REDIRECT_URI,
  };
  const requestUrl = createRequestUel(methodUrl, data);
  log('requestUrl=>', requestUrl);
  const res = await axios.post(requestUrl);
  log(res.data);
  return res.data;
}

function createRequestUel(methodUrl: string, obj: any): string {
  const str = Object.keys(obj).map(key => {
    return `${key}=${obj[key]}`;
  });
  const queryString = str.join('&');
  return `${methodUrl}?${queryString}`;
}
