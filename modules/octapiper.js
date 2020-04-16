import Cookies from './cookies';
import ABTest from './ab-test';
import Rewriter from './rewriter';


class Octapiper {
  constructor(config) {
    this.config = config;
    this.abTest = null;
  }

  async updateVariantList() {
    const apiUrl = this.config.getVariantListEndpoint();
    const response = await fetch(apiUrl);
    const responseJson = await response.json();
    if (responseJson && responseJson.variants) {
      this.config.setVariantEnpoints(responseJson.variants);
      this.abTest = new ABTest(responseJson.variants.length);
    }
  }

  getVariantFromCookie(headers) {
    const cookies = new Cookies(headers);
    return cookies.get(this.config.getAbTestCookieKey());
  }

  selectVariant(headers) {
    const cookieVariant = this.getVariantFromCookie(headers);
    const index = cookieVariant || this.abTest.getVariant();
    return [index, this.config.getVariantEndpoint(index)];
  }

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

  async handleRequest(request) {
    await this.updateVariantList();
    const resp = await this.serveVariant(request);
    return resp;
  }
}

export default Octapiper;
