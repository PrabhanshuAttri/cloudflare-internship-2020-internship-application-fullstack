import CustomRewriter from './custom-rewriter';

const Rewriter = (response) => {
  const rewriter = new HTMLRewriter()
    .on('title',
      new CustomRewriter(
        null,
        { searchText: /(variant \d+(\.\d)*)/i, replaceWith: 'Octapipers' },
      ))
    .on('h1#title',
      new CustomRewriter(
        null,
        { searchText: /(variant \d+(\.\d)*)/i, replaceWith: 'Octapipers' },
      ))
    .on('p#description',
      new CustomRewriter(
        null,
        {
          searchText: /(?<=This is variant)(.*)(?=of the take home project!)/g,
          replaceWith: 'Not all those who wander are lost. - J.R.R. Tolkein',
        },
      ))
    .on('a#url',
      new CustomRewriter(
        'href',
        { searchText: 'cloudflare.com', replaceWith: 'prabhanshu.com' },
      ))
    .on('a#url',
      new CustomRewriter(
        'target',
        { searchText: '', replaceWith: '_blank' },
      ))
    .on('a#url',
      new CustomRewriter(
        null,
        {
          searchText: 'Return to cloudflare.com',
          replaceWith: 'Visit my home on web',
        },
      ));

  return rewriter.transform(response);
};

export default Rewriter;
