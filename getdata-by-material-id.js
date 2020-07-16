const axios = require('axios');
const execTime = require('execution-time')();

const CONFIG = require('./config');

const filefunctions = require('./filefunctions');
const sorter = require('./sort');

let dataArray;
const promises = [];

const setPayloadForRecommender = (materialId, modelType) => {
  const payload = CONFIG.payloadSchemeRecommender;
  payload.resource_id = Number(materialId);
  payload.model_type = modelType;
  return payload;
};

const getDataFromApiByMatId = async (materialId, modelType) => {
  const payload = setPayloadForRecommender(materialId, modelType);
  const url = CONFIG.urlRecommender;
  const headers = CONFIG.getHeaders();

  try {
    execTime.start();
    let results = await axios.post(url, payload, headers);
    const execTimeEnd = execTime.stop();
    results = results.data.output.rec_materials.slice(0, CONFIG.resultsPerModelType);
    results.forEach((result) => {
      const { weight } = result;
      result.wikipedia = '';
      result.model_type = [];
      result.weight = [];
      result.request_time = [];
      result.model_type.push(modelType);
      result.weight.push(weight);
      result.request_time.push(execTimeEnd.time);
    });
    return results;
  } catch (error) {
    console.error(`error in getDataFromApi(): 
      ${error.response.status} 
      ${error.response.statusText}
      ${error.response.data.message}`);
    return error;
  }
};

const handleResponse = (response, index) => {
  dataArray.lectures[index].attributes.results.push(...response);
};

function sleep(ms) {
  console.log('waiting...');
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const sendRequestPerLecture = async () => {
  const lecturesCount = dataArray.lectures.length;
  for (let i = 0; i < lecturesCount; i += 1) {
    const materialId = dataArray.lectures[i].attributes.mat_id;
    for (let k = 0; k < CONFIG.modelTypes.length; k += 1) {
      const modelType = CONFIG.modelTypes[k];
      console.log(`lecture ${i} (${modelType}) - sent`);
      promises.push(
        await getDataFromApiByMatId(materialId, modelType)
          .then((res) => {
            const time = res[0].request_time.toString().split('.')[0];
            console.log(`lecture ${i} (${modelType}) - resolved (${time}ms)`);
            handleResponse(res, i);
          }),
      );
    }
    if (CONFIG.useSleepTime) await sleep(CONFIG.sleepTime);
  }
};

const main = async () => {
  dataArray = await filefunctions.loadData();

  await sendRequestPerLecture();

  Promise.all(promises)
    .then(() => {
      const countedResult = sorter.count(dataArray);
      filefunctions.storeData(countedResult, CONFIG.filePathOutputCounted);
    })
    .then(() => {
      const sortedResult = sorter.sort(dataArray);
      filefunctions.storeData(sortedResult, CONFIG.filePathOutputSorted);
    })
    .then(() => {
      filefunctions.storeData(dataArray, CONFIG.filePathOutput);
    })
    .catch((error) => console.log(error));
};

main();
