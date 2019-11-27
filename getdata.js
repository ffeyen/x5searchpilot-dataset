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

let dataArray;
const promises = [];
const resultsPerModelType = 3;

const loadData = () => new Promise((resolve, reject) => {
  fs.readFile(filePathInput, 'utf-8', (err, data) => {
    if (err) {
      console.log('err');
      reject(err);
    } else {
      resolve(JSON.parse(data));
    }
  });
});

const storeData = (dataResults) => {
  fs.writeFile(filePathOutput, JSON.stringify(dataResults, null, 2), 'utf-8', (err) => {
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
    let results = await axios.post(url, payload, headers);
    console.log(results);
    results = // results.data.output.rec_materials.slice(0, resultsPerModelType);
    results.forEach((result) => {
      result['model-type'] = modelType;
      // Delete wikipedia key completely
      result.wikipedia = '';
    });
    return results;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getLectureSearchstring = (lecture) => {
  const title = lecture.title_translated ? lecture.title_translated : lecture.title;
  const desc = lecture.description_translated ? lecture.description_translated : lecture.description;
  return `${title} ${desc}`;
};

const handleResponse = (response, index) => {
  dataArray.lectures[index].attributes.results.push(...response);
};

const addResultsToCourses = async () => {
  const lecturesCount = dataArray.lectures.length;
  for (let i = 0; i < lecturesCount; i += 1) {
    const searchstring = getLectureSearchstring(dataArray.lectures[i].attributes);
    for (let k = 0; k < 2; k += 1) {
      const modelType = apiConfig.modelTypes[k];
      promises.push(
        getDataFromApi(searchstring, modelType)
          .then((res) => {
            handleResponse(res, i);
          }),
      );
    }
  }
};

const main = async () => {
  dataArray = await loadData();

  await addResultsToCourses();

  Promise.all(promises)
    .then(() => {
      storeData(dataArray);
    })
    .catch((error) => console.log(error));
};

main();
