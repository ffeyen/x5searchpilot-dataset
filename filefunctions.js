const fs = require('fs');
const path = require('path');

const CONFIG = require('./config');

const loadData = () => new Promise((resolve, reject) => {
  fs.readFile(CONFIG.filePathInput, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      reject(err);
    } else {
      console.log('fs: input course data loaded');
      resolve(JSON.parse(data));
    }
  });
});

const storeData = (dataResults, outputPath) => {
  fs.writeFile(outputPath, JSON.stringify(dataResults, null, 2), 'utf-8', (err) => {
    const filename = path.parse(outputPath).base;
    if (err) {
      console.log(`fs: error while writing data (${filename})`);
      console.log(err);
    } else {
      console.log(`fs: wrote data to output file (${filename})`);
    }
  });
};

module.exports = { loadData, storeData };
