import parseCookies from 'cookie-parse';

class Cookies {
  constructor(headers) {
    const cookieString = headers.get('cookie');
    this.cookies = cookieString ? parseCookies.parse(cookieString) : {};
  }

  get(key) {
    if (Object.prototype.hasOwnProperty.call(this.cookies, key)) return this.cookies[key];
    return null;
  }
}

export default Cookies;
