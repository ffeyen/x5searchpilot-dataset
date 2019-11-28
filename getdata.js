const axios = require('axios');
const fs = require('fs');

const CONFIG = require('./config');

const filePathInput = `${__dirname}/input/course-data.json`;
const filePathOutput = `${__dirname}/output/data-materials.json`;

let dataArray;
const promises = [];

const loadData = () => new Promise((resolve, reject) => {
  fs.readFile(filePathInput, 'utf-8', (err, data) => {
    if (err) {
      console.log('err');
      reject(err);
    } else {
      console.log('fs: input course data loaded');
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
      console.log('fs: wrote data to output file');
    }
  });
};

const setPayload = (searchtext, modelType) => {
  const payload = CONFIG.payloadScheme;
  payload.text = searchtext;
  payload.model_type = modelType;
  return payload;
};

const getDataFromApi = async (searchtext, modelType) => {
  const payload = setPayload(searchtext, modelType);
  const url = CONFIG.urlSearch;
  const headers = CONFIG.getHeaders();

  try {
    let results = await axios.post(url, payload, headers);
    results = results.data.output.rec_materials.slice(0, CONFIG.resultsPerModelType);
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
  for (let i = 21; i < lecturesCount; i += 1) {
    const searchstring = getLectureSearchstring(dataArray.lectures[i].attributes);
    for (let k = 0; k < 3; k += 1) {
      const modelType = CONFIG.modelTypes[k];
      console.log(`request sent: lecture ${i} / model-type ${modelType}`);
      promises.push(
        getDataFromApi(searchstring, modelType)
          .then((res) => {
            console.log(`request resolved: lecture ${i} / model-type ${modelType}`);
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
