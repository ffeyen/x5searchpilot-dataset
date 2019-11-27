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
  fs.writeFile(filePathOutput, dataResults, 'utf-8', (err) => {
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
    const results = await axios.post(url, payload, headers);
    return results.data.output.rec_materials;
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

const addResultsToCourses = async (courseData) => {
  console.log(courseData);
  const data = courseData;
  for (let i = 0; i < data.lectures.length; i += 1) {
    const searchstring = getLectureSearchstring(data.lectures[i].attributes);
    for (let k = 0; k < 3; k += 1) {
      const modelType = apiConfig.modelTypes[k];
      const results = getDataFromApi(searchstring, modelType);
      return results;
    }
  }
};

const main = async () => {
  const dataArray = await loadData();

  const results = await addResultsToCourses(dataArray);
  console.log(results);
};

main();
