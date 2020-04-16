/** Class encapsulating app configuration */
class Config {
  /**
   * Create config obj
   */
  constructor() {
    this.config = {
      keys: {
        abTestCookie: 'experimental',
      },
      apiEndpoints: {
        favicon: 'https://www.prabhanshu.com/img/favicons/favicon-96x96.png',
        variantList: 'https://cfw-takehome.developers.workers.dev/api/variants',
        variants: [],
      },
    };
  }

  /**
   * Set list of variants
   * @param {Object[]} variants - List of variant api endpoints
   */
  setVariantEnpoints(variants) {
    this.config.apiEndpoints.variants = variants;
  }

  /**
   * Get favicon url
   */
  getFaviconEndpoint() {
    return this.config.apiEndpoints.favicon;
  }

  /**
   * Get endpoint to fetch variant list.
   */
  getVariantListEndpoint() {
    return this.config.apiEndpoints.variantList;
  }

  /**
   * Get i'th endpoint from the variant list
   * @param {number} index - index of the required variant in the list
   */
  getVariantEndpoint(index) {
    const i = index < this.config.apiEndpoints.variants.length
      ? index : 0;

    return this.config.apiEndpoints.variants.length > 0
      ? this.config.apiEndpoints.variants[i]
      : null;
  }

  getVariantCount() {
    return this.config.apiEndpoints.variants.length;
  }

  /**
   * Get AB Testing key for cookies
   */
  getAbTestCookieKey() {
    return this.config.keys.abTestCookie;
  }
}

export default Config;
