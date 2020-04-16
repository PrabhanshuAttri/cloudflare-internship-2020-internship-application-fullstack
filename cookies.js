import parseCookies from 'cookie-parse';

class Cookies {
  constructor(headers) {
    const cookieString = headers.get('cookie')
    this.cookies = cookieString ? parseCookies.parse(cookieString) : {};
  }

  get(key) {
    if (this.cookies.hasOwnProperty(key)) return this.cookies[key]
    return null;
  }
}

export default Cookies;
