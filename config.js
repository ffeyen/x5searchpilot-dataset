export const urlSearch = 'http://wp3.x5gon.org/searchengine/v1';
export const urlRecommender = 'http://wp3.x5gon.org/recommendsystem/v1';

export const modelTypes = ['doc2vec', 'wikifies', 'tfidf'];

export const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  return headers;
};
