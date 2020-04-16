import Cookies from './cookies';
import ABTest from './ab-test';
import Rewriter from './rewriter';

/**
 * app entry class
 */
class Octapiper {
  /**
   * Creates instance of the app
   * @param {Config} config - instance of configuration
   */
  constructor(config) {
    this.config = config;
    this.abTest = null;
  }

  /**
   * Updates variant list in config
   */
  async updateVariantList() {
    const apiUrl = this.config.getVariantListEndpoint();
    const response = await fetch(apiUrl);
    const responseJson = await response.json();
    if (responseJson && responseJson.variants) {
      this.config.setVariantEnpoints(responseJson.variants);
      this.abTest = new ABTest(responseJson.variants.length);
    }
  }

  /**
   * Gets Variant info from cookies
   * @param {Object{}} headers - headers to extract cookies
   */
  getVariantFromCookie(headers) {
    const cookies = new Cookies(headers);
    return cookies.get(this.config.getAbTestCookieKey());
  }

  /**
   * Selects variant from cookies or randomly
   * @param {Object{}} headers - headers to extract cookies
   */
  selectVariant(headers) {
    const cookieVariant = this.getVariantFromCookie(headers);
    const index = cookieVariant || this.abTest.getVariant();
    return [index, this.config.getVariantEndpoint(index)];
  }

  /**
   * Fetches selected variant and sever the response
   * @param {Object{}} request - complete request object
   */
  async serveVariant(request) {
    try {
      const [variant, variantUrl] = this.selectVariant(request.headers);
      const variantResponse = await fetch(variantUrl);
      const response = Rewriter(variantResponse);
      response.headers.append(
        'Set-Cookie',
        `${this.config.getAbTestCookieKey()}=${variant}; path=/`,
      );
      return response;
    } catch (err) {
      return new Response('Internal Server Error', { status: 500, headers: { 'Content-Type': 'text/html' } });
    }
  }

  /**
   * Handles request and server the selected variant
   * @param {Object{}} request - complete request object
   */
  async handleRequest(request) {
    await this.updateVariantList();
    const resp = await this.serveVariant(request);
    return resp;
  }
}

export default Octapiper;
