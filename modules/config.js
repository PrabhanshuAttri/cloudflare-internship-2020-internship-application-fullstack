class Config {
  constructor() {
    this.config = {
      keys: {
        abTestCookie: 'experimental',
      },
      apiEndpoints: {
        favicon: 'https://dash.cloudflare.com/favicon.ico',
        variantList: 'https://cfw-takehome.developers.workers.dev/api/variants',
        variants: [],
      },
    };
  }

  setVariantEnpoints(variants) {
    this.config.apiEndpoints.variants = variants;
  }

  getFaviconEndpoint() {
    return this.config.apiEndpoints.favicon;
  }

  getVariantListEndpoint() {
    return this.config.apiEndpoints.variantList;
  }

  getVariantEndpoint(index) {
    const i = index < this.config.apiEndpoints.variants.length
      ? index : 0;

    return this.config.apiEndpoints.variants.length > 0
      ? this.config.apiEndpoints.variants[i]
      : null;
  }

  getAbTestCookieKey() {
    return this.config.keys.abTestCookie;
  }
}

export default Config;
