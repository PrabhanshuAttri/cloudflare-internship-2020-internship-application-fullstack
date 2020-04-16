import parseCookies from 'cookie-parse';

/** Class representing cookies */
class Cookies {
  /**
   * Create an object to parse cookies
   * @param {Object{}} headers - request headers
   */
  constructor(headers) {
    const cookieString = headers.get('cookie');
    this.cookies = cookieString ? parseCookies.parse(cookieString) : {};
  }

  /**
   * Get specific cookie value from the headers
   * @param {string} key - key for required data in cookies
   */
  get(key) {
    if (Object.prototype.hasOwnProperty.call(this.cookies, key)) return this.cookies[key];
    return null;
  }
}

export default Cookies;
