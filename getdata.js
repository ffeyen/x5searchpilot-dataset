const axios = require('axios');
const apiConfig = require('./config');

const payloadScheme = {
  text: '',
  type: '',
  page: 1,
  model_type: '',
};

const setPayload = (searchtext, modelType) => {
  const payload = payloadScheme;
  payload.text = searchtext;
  payload.model_type = modelType;
  return payload;
};

const getDataFromApi = async (searchtext, modelType) => {
  const payload = setPayload(searchtext, modelType);
  const url = apiConfig.urlSearch;
  const headers = apiConfig.getHeaders();

  try {
    const response = await axios.post(url, payload, headers);
    console.log(response.data.output.rec_materials);
  } catch (error) {
    console.log(error);
  }
};

getDataFromApi('medieval', 'doc2vec');
