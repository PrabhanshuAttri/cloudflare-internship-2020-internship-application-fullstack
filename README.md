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
- [ ] Publish to a domain: Added all subdomain records and deployed on [https://octa.prabhanshu.com/](https://octa.prabhanshu.com/). Even after adding `A` record for subdomain, `DNS_PROBE_FINISHED_NXDOMAIN` error comes up
