import Router from './router';
import Octapiper from './octapiper';
import Config from './config';

const config = new Config();
const octapiper = new Octapiper();

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
