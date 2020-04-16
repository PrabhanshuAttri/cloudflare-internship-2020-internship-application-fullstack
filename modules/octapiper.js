import fetch from 'node-fetch';

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

  async getErrorResponse(errorCode, content = null) {
    let body = '';
    if (!content) {
      switch (errorCode) {
        case 500:
          body = 'Internal Server Error';
          break;
        case 503:
          body = 'Service Unavailable';
          break;
        case 404:
        default:
          body = 'Not found';
          break;
      }
    } else {
      body = content;
    }
    const resp = new Response(
      body,
      {
        status: errorCode,
        headers: { 'Content-Type': 'text/html' },
      },
    );
    return resp;
  }

  /**
   * Updates variant list in config
   */
  async updateVariantList() {
    const apiUrl = this.config.getVariantListEndpoint();
    try {
      const response = await fetch(apiUrl);
      if (response.status !== 200) {
        throw 'Status not 200';
      }
      const responseJson = await response.json();

      if (responseJson && responseJson.variants) {
        this.config.setVariantEnpoints(responseJson.variants);
        this.abTest = new ABTest(responseJson.variants.length);
      } else {
        throw 'Variants not found';
      }
    } catch (err) {
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
      if (this.config.getVariantCount() < 1) {
        throw 'No variant available';
      }
      const [variant, variantUrl] = this.selectVariant(request.headers);
      const variantResponse = await fetch(variantUrl);

      if (variantResponse.status !== 200) {
        throw 'Variant page not accessible';
      }
      const response = Rewriter(variantResponse);
      response.headers.append(
        'Set-Cookie',
        `${this.config.getAbTestCookieKey()}=${variant}; path=/`,
      );
      return response;
    } catch (err) {
      return this.getErrorResponse(404, 'This page is not available');
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
