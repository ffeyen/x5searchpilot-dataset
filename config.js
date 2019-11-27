const apiConfig = {};

apiConfig.urlSearch = 'http://wp3.x5gon.org/searchengine/v1';
apiConfig.urlRecommender = 'http://wp3.x5gon.org/recommendsystem/v1';

apiConfig.modelTypes = ['doc2vec', 'tfidf', 'wikifies'];

apiConfig.getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  return headers;
};

module.exports = apiConfig;
