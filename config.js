const CONFIG = {};

/*
Config for X5GON API 'searchengine'
for further information see http://wp3.x5gon.org/lamapidoc
*/

// course-data input file (see course-data.template.json)
// default: /input/course-data.json
CONFIG.filePathInput = `${__dirname}/input/course-data.json`;

// copied course-data + results per lecture and model_type output file
// default: /input/course-data.json
CONFIG.filePathOutput = `${__dirname}/output/data-materials.json`;

// aggregated results by material_id and model_type
// default: /output/countedResults.json
CONFIG.filePathOutputCounted = `${__dirname}/output/countedResults.json`;

// course-data + aggregated/sorted results (no duplicates; saves model_type and related weights)
// default: /output/sortedResults.json
CONFIG.filePathOutputSorted = `${__dirname}/output/sortedResults.json`;

// model_type request config (which values should be used to model_type parameter in payload scheme)
CONFIG.modelTypes = ['doc2vec', 'tfidf', 'wikifier'];
CONFIG.resultsPerModelType = 5;

// sleepTimer config (only activate if nescessary)
// default: false; 10000;
CONFIG.useSleepTime = false;
CONFIG.sleepTime = 10000;

// X5GON API routes
CONFIG.urlSearch = 'http://wp3.x5gon.org/searchengine/v1';
CONFIG.urlRecommender = 'http://wp3.x5gon.org/recommendsystem/v1';

// header configuration
// default: 'Content-Type': 'application/json' only
CONFIG.getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return headers;
};

// payload scheme search endpoint
CONFIG.payloadSchemeSearch = {
  text: '',
  type: '',
  page: 1,
  model_type: '',
  remove_duplicates: 1,
  nb_wikiconcepts: 0,
  return_wikisupport: 0,
};

// payload scheme recommender endpoint
CONFIG.payloadSchemeRecommender = {
  resource_id: '',
  n_neighbors: 10,
  model_type: '',
};

module.exports = CONFIG;
