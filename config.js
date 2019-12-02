const CONFIG = {};

CONFIG.filePathInput = `${__dirname}/input/course-data.json`;
CONFIG.filePathOutput = `${__dirname}/output/data-materials.json`;

CONFIG.urlSearch = 'http://wp3.x5gon.org/searchengine/v1';
CONFIG.urlRecommender = 'http://wp3.x5gon.org/recommendsystem/v1';

CONFIG.modelTypes = ['doc2vec', 'tfidf', 'wikifier'];
CONFIG.resultsPerModelType = 10;

CONFIG.useSleepTime = true;
CONFIG.sleepTime = 10000;

CONFIG.getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return headers;
};

CONFIG.payloadScheme = {
  text: '',
  type: '',
  page: 1,
  model_type: '',
  remove_duplicates: 1,
  nb_wikiconcepts: 0,
  return_wikisupport: 0,
};

module.exports = CONFIG;
