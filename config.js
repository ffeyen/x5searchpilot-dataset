const CONFIG = {};

CONFIG.urlSearch = 'http://wp3.x5gon.org/searchengine/v1';
CONFIG.urlRecommender = 'http://wp3.x5gon.org/recommendsystem/v1';

CONFIG.modelTypes = ['doc2vec', 'tfidf', 'wikifier'];
CONFIG.resultsPerModelType = 3;

CONFIG.getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  return headers;
};

CONFIG.payloadScheme = {
  text: '',
  type: '',
  page: 1,
  model_type: '',
};

module.exports = CONFIG;
