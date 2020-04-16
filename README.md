# Cloudflare Workers Internship Application: Full-Stack

### Requirements

- [x] Request the URLs from the API: on get request, api variants are fetched from the given endpoint.
- [x] Request a (random: see #3) variant: One of the two URLs, fetched in the last api call, is used to serve response to the user.
- [x] Distribute requests between variants: on request, one of the URLs, received in the first part, is served. All the URLs have equal weightage to distrbute requests evenly. The AB Testing module has the ability to alter the weightage of each URL.
- [x] Deployment
  - Register a workers.dev subdomain: [https://octapipers.prabhanshu.workers.dev/](https://octapipers.prabhanshu.workers.dev/)
  - A user should be able to visit the deployed version of the site: [https://octapipers.prabhanshu.workers.dev/](https://octapipers.prabhanshu.workers.dev/)
- [x] Changing copy/URLs: Altered copy and URLs for `title`, `h1#title`, `p#description`, and `a#url`. Added target attribute to `a#url`.
- [x] Persisting variants: Using cookies, user sees the same variant.
- [x] Publish to a domain: Added all subdomain records and deployed on [https://octa.prabhanshu.com/](https://octa.prabhanshu.com/).



### Modules

- `ABTest`: Module to generate different tests using weighted randomness under the graph. The module is capable of evenly selected a variant from any number of variants. It's scalable with increase in number of variants provided by the given url `https://cfw-takehome.developers.workers.dev/api/variants`. Non uniform weight functionality needs to be implemented by passing an array of weights corresponding to the variants, mapped using index.
- `Config`: For modularity and maintainable purposes, config module is used to maintain system-wide app configurations. It contains predefined configurations as well as dynamically config, which changes with the state of the app.
- `Cookies`: For separation of concerns, cookie handling and extraction is separated to Cookie module.
- `HTMLHandler`: In order to change copys and urls, this custom module is passed to HTMLRewriter. The methods of the module are generic and reusable.
- `Router`: For the sake of maintainbility, the routing functionality is encapsulated in this module. Currently only get
  method is implemented. This is inspired from Cloudflare samples on github.

- `Octapiper`: The main app module is called Octapiper. This contains main handler methods, fetch methods and other entry functionalities.


### Why is it named Octapiper?

Octapiper is from [Silicon Valley](https://www.imdb.com/title/tt2575988/). I was re-watching the complete series while working on this assignment and that inspired me to name the core application as Octapiper.



Credits: Cloudflare documenation, blogs, templates and forums.
