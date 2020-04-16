import Config from './modules/config';
import Router from './modules/router';
import Octapiper from './modules/octapiper';

const config = new Config();
const octapiper = new Octapiper(config);

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request, event))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request, e) {
  const router = new Router()
  router.get('.*/favicon.ico', request => fetch(config.getFaviconEndpoint()))

  router.get('/', req => octapiper.handleRequest(req))
  const resp = await router.route(request)
  return resp
}
