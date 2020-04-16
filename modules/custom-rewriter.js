class CustomRewriter {
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

  text(text) {
    if (this.searchText && this.replaceWith) {
      if (text.text.match(this.searchText)) text.replace(this.replaceWith);
    }
  }
}

export default CustomRewriter;
