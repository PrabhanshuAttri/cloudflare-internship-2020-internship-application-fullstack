const Method = method => req => req.method.toLowerCase() === method.toLowerCase()
const Get = Method('get')
const Path = regExp => req => {
  const url = new URL(req.url)
  const path = url.pathname
  const match = path.match(regExp) || []
  return match[0] === path
}

class Router {
  constructor() {
    this.routes = []
  }

  handle(conditions, handler) {
    this.routes.push({
      conditions,
      handler,
    })
    return this
  }

  get(url, handler) {
    return this.handle([Get, Path(url)], handler)
  }

  route(req) {
    const route = this.resolve(req)

    if (route) {
      return route.handler(req)
    }

    return new Response('resource not found', {
      status: 404,
      statusText: 'not found',
      headers: {
        'content-type': 'text/plain',
      },
    })
  }

  resolve(req) {
    return this.routes.find(r => {
      if (!r.conditions || (Array.isArray(r) && !r.conditions.length)) {
        return true
      }

      if (typeof r.conditions === 'function') {
        return r.conditions(req)
      }

      return r.conditions.every(c => c(req))
    })
  }
}

export default Router;
