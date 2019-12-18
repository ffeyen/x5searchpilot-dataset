const sorter = {};

sorter.count = (input) => {
  const aggregatedResults = {};
  const workdata = input.lectures;

  for (let i = 0; i < workdata.length; i += 1) {
    const { results } = workdata[i].attributes;

    if (typeof aggregatedResults[i] === 'undefined') {
      aggregatedResults[i] = {};
    }

    for (let k = 0; k < results.length; k += 1) {
      const materialId = results[k].material_id;
      const modelType = results[k].model_type[0];
      const resultWeight = results[k].weight[0];

      if (typeof aggregatedResults[i][materialId] === 'undefined') {
        aggregatedResults[i][materialId] = {};
      }

      if (typeof aggregatedResults[i][materialId].modelTypes === 'undefined') {
        aggregatedResults[i][materialId][modelType] = resultWeight;
      }
    }
  }
  return aggregatedResults;
};

sorter.sort = (input) => {
  const sortedResults = {};

  console.log('\nstart sorting...');

  for (let i = 0; i < input.lectures.length; i += 1) {
    const { results } = input.lectures[i].attributes;
    sortedResults[i] = input.lectures[i];
    sortedResults[i].attributes.results = [];

    for (let k = 0; k < results.length; k += 1) {
      const materialId = results[k].material_id;
      const modelType = results[k].model_type[0];
      const resultWeight = results[k].weight[0];
      const result = results[k];
      let matchFound = false;

      sortedResults[i].attributes.results.forEach((item) => {
        if (item.material_id === materialId) matchFound = true;
      });

      if (!matchFound) {
        sortedResults[i].attributes.results.push(result);
      } else {
        console.log(`lecture ${i} matching result found at id ${materialId}`);
        const matchIndex = sortedResults[i].attributes.results.findIndex(
          (item) => item.material_id === materialId,
        );
        sortedResults[i].attributes.results[matchIndex].model_type.push(modelType);
        sortedResults[i].attributes.results[matchIndex].weight.push(resultWeight);
      }
    }
  }
  console.log('sorting complete\n');

  return sortedResults;
};

module.exports = sorter;
