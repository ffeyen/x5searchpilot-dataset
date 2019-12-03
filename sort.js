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
      const modelType = results[k].model_type;
      const resultWeight = results[k].weight;

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
  console.log(input);
};

module.exports = sorter;
