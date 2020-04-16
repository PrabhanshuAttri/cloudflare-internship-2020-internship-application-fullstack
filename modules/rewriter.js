import HTMLHandler from './html-handler';

/**
 * Custom HTMLRewriter method
 */
const Rewriter = (response) => {
  const rewriter = new HTMLRewriter()
    .on('title',
      new HTMLHandler(
        null,
        { searchText: /(variant \d+(\.\d)*)/i, replaceWith: 'Octapipers' },
      ))
    .on('h1#title',
      new HTMLHandler(
        null,
        { searchText: /(variant \d+(\.\d)*)/i, replaceWith: 'Octapipers' },
      ))
    .on('p#description',
      new HTMLHandler(
        null,
        {
          searchText: /(?<=This is variant)(.*)(?=of the take home project!)/g,
          replaceWith: 'Not all those who wander are lost. - J.R.R. Tolkein',
        },
      ))
    .on('a#url',
      new HTMLHandler(
        'href',
        { searchText: 'cloudflare.com', replaceWith: 'prabhanshu.com' },
      ))
    .on('a#url',
      new HTMLHandler(
        'target',
        { searchText: '', replaceWith: '_blank' },
      ))
    .on('a#url',
      new HTMLHandler(
        null,
        {
          searchText: 'Return to cloudflare.com',
          replaceWith: 'Visit my home on web',
        },
      ));

  return rewriter.transform(response);
};

export default Rewriter;
