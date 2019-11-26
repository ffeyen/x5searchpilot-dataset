const urlSearch = 'http://wp3.x5gon.org/searchengine/v1';
const urlRecommender = 'http://wp3.x5gon.org/recommendsystem/v1';

const modelTypes = ['doc2vec', 'wikifies', 'tfidf'];

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  return headers;
};

module.exports = urlSearch;
module.exports = urlRecommender;
module.exports = modelTypes;
module.exports = getHeaders;
