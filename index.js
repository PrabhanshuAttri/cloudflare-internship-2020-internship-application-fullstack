import fetch from 'node-fetch';

import Config from './modules/config';
import Router from './modules/router';
import Octapiper from './modules/octapiper';

const config = new Config();
const octapiper = new Octapiper(config);

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const router = new Router();
  router.get('.*/favicon.ico', () => fetch(config.getFaviconEndpoint()));

  router.get('/', (req) => octapiper.handleRequest(req));
  const resp = await router.route(request);
  return resp;
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
