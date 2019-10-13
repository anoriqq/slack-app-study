// import {WebClient} from '@slack/web-api';
// import ky from 'ky';
// import request from 'request-promise-native';

const SLACK_CLIENT_ID = '353190391027.786804600948';

export function getAuthorizeUrl(): string {
  const scopes = ['incoming-webhook'];
  const scope = scopes.join(' ');
  const redirect_uri = 'http://localhost:8080/slack/authorize';
  const apiMethodUrl = 'https://slack.com/oauth/authorize';

  return `${apiMethodUrl}?scope=${scope}&client_id=${SLACK_CLIENT_ID}&redirect_uri=${redirect_uri}&state=`;
}

export function authorizeSlackAccess(code: string){
  return;
}
