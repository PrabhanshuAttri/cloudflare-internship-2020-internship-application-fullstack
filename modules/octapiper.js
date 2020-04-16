import Cookies from './cookies';
import ABTest from './ab-test';

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
      this.config.setVariantEnpoints(responseJson.variants)
      this.abTest = new ABTest(responseJson.variants.length)
    }
  }

  getVariantFromCookie(headers) {
    const cookies = new Cookies(headers)
    return cookies.get(this.config.getAbTestCookieKey());
  }

  selectVariant(headers) {
    const cookieVariant = this.getVariantFromCookie(headers)
    let index = cookieVariant || this.abTest.getVariant();
    return [index, this.config.getVariantEndpoint(index)];
  }

  async serveVariant(request) {
    try {
      const [variant, variantUrl] = this.selectVariant(request.headers)
      const variantResponse = await fetch(variantUrl)
      const content = await variantResponse.text()

      const response = new Response(
        content,
        {
          headers: {
            'Content-Type': variantResponse.headers.get('content-type')
          },
          status: variantResponse.status
        }
      )
      response.headers.append(
        'Set-Cookie',
        `${this.config.getAbTestCookieKey()}=${variant}; path=/`
      )
      return response;
    } catch(err) {
      console.log('eee', err)
      return new Response('Internal Server Error', { status: 500, headers: { 'Content-Type': 'text/html'}})
    }
  }

  async handleRequest(request) {
    await this.updateVariantList();
    return await this.serveVariant(request);
  }
}

export default Octapiper;
