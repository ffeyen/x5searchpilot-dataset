const axios = require('axios');
const fs = require('fs');

const apiConfig = require('./config');

const filePathInput = `${__dirname}/input/course-data.json`;
const filePathOutput = `${__dirname}/output/data-materials.json`;

const payloadScheme = {
  text: '',
  type: '',
  page: 1,
  model_type: '',
};

let dataArray = [];

const loadData = () => {
  fs.readFile(filePathInput, 'utf-8', (err, data) => {
    if (err) {
      console.log('fs: error loading coursedata');
      console.log(err);
    } else {
      dataArray = JSON.parse(data);
      console.log('fs: success loading coursedata');
    }
  });
};

const storeData = (fileWithResults) => {
  fs.writeFile(filePathOutput, fileWithResults, 'utf-8', (err) => {
    if (err) {
      console.log('fs: error while writing data');
      console.log(err);
    } else {
      console.log('fs: wrote data to file');
    }
  });
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
    return response.data.output.rec_materials;
  } catch (error) {
    console.error(error);
  }
};

loadData();

// getDataFromApi('medieval', 'doc2vec');
