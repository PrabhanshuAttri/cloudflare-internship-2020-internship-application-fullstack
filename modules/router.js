/** Inspired from cloudflare documentation and templates */

const Method = (method) => (req) => req.method.toLowerCase() === method.toLowerCase();
const Get = Method('get');
const Path = (regExp) => (req) => {
  const url = new URL(req.url);
  const path = url.pathname;
  const match = path.match(regExp) || [];
  return match[0] === path;
};

/** Router class to handle routes */
class Router {
  /**
   * Initializes the object for routing
   */
  constructor() {
    this.routes = [];
  }

  /**
   * Generic handler to process router based on conditions
   * @param {Object[]} conditions - array of method and url
   * @param {Object{}} handler - method to handle the request
   */
  handle(conditions, handler) {
    this.routes.push({
      conditions,
      handler,
    });
    return this;
  }

  /**
   * To create a get route
   * @param {string} url - pattern of the path
   * @param {Object{}} handler - event handler when the given route is fetch
   */
  get(url, handler) {
    return this.handle([Get, Path(url)], handler);
  }

  /**
   * Processes the current request based on defined routing
   * @param {Object{}} req - complete request object to process
   */
  route(req) {
    const route = this.resolve(req);

    if (route) {
      return route.handler(req);
    }

    return new Response('resource not found', {
      status: 404,
      statusText: 'not found',
      headers: {
        'content-type': 'text/plain',
      },
    });
  }

  /**
   * Processes the current request based on defined routing
   * @param {Object{}} req - complete request object to process
   */
  resolve(req) {
    return this.routes.find((r) => {
      if (!r.conditions || (Array.isArray(r) && !r.conditions.length)) {
        return true;
      }

      if (typeof r.conditions === 'function') {
        return r.conditions(req);
      }

      return r.conditions.every((c) => c(req));
    });
  }
}

export default Router;
