/** Class for HTTPHandler */
class HTMLHandler {
  /**
   * Creates a custom element handler
   * @param {string} attributeName - name of the attribute to change
   * @param {Object{}} text - object with update information
   * @param {string} text.searchText - text to be replaced
   * @param {string} text.replaceWith - text to be replaced with
   */
  constructor(attributeName = null, text = null) {
    this.attributeName = attributeName;
    if (text) {
      const { searchText, replaceWith } = text;
      this.searchText = searchText;
      this.replaceWith = replaceWith;
    } else {
      this.searchText = null;
      this.replaceWith = null;
    }
  }

  /**
   * Element updater method
   */
  element(element) {
    if (this.attributeName) {
      const attribute = element.getAttribute(this.attributeName);
      if (attribute) {
        element.setAttribute(
          this.attributeName,
          attribute.replace(
            this.searchText,
            this.replaceWith,
          ),
        );
      } else {
        element.setAttribute(this.attributeName, this.replaceWith);
      }
    }
  }

  /**
   * text updater method
   */
  text(text) {
    if (this.searchText && this.replaceWith) {
      if (text.text.match(this.searchText)) text.replace(this.replaceWith);
    }
  }
}

export default HTMLHandler;
