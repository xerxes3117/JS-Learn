//LEVEL: HARD

// Problem statement: 
// We have collected data from different data-sources, they contain different attributes
// What we want to do is to merge data based on a specific key

//  Hints/Suggestions:
//  Hint:
//  - Convert datasources to hashmaps for faster lookup (see dataSource1Transformed)
//  Final Suggestion (by interviewer):
//  - No need to find the ids in each datasource. After transforming to map with keys & key value as object (see commented 
//   dataSource1Transformed), just merge the object by keys in each datasource i.e. merge all object elements with key = 1 in each data source. 
//   Duplicates will be removed automatically Merging can be done using Object.assign or spread Operator

const dataSource1 = [
  ["id", "name", "parent"],
  ["2", "Bob", "yes"],
  ["1", "John", "yes"],
];

/* const dataSource1Transformed = [
  "2": {id: "2", name: "Bob", parent: "yes"},
  "1": {id: "1", name: "John", parent: "yes"},
]; */

const dataSource2 = [
  ["id", "name", "height"],
  ["2", "Bob", "50"],
  ["1", "John", "45"],
  ["3", "Susan", "48"],
];

const dataSource3 = [
  ["id", "name", "age", "weight", "cool"],
  ["3", "Susan", "20", "120", "true"],
  ["1", "John", "21", "150", "true"],
  ["2", "Bob", "23", "90", "false"],
  ["4", "Ben", "20", "100", "true"],
];

const personDataSources = [dataSource1, dataSource2, dataSource3];

function transformData(data, key){
	const listOfCols = data[0]
	const keyIndex = listOfCols.indexOf(key);
  const dataMap = {};
  
  const arrayOfEls = data.map((el, i) => {
  	if(i > 0){
    	const elMap = {};
    	el.forEach((d,i) => elMap[listOfCols[i]] = d)
    }
  })
  
  return arrayOfEls;
}

function mergeDataByKey(dataSources, key) {
  //Get the unique columns
  let uniqCols = dataSources.reduce((uniqKeys, source) => {
  	const keys = source[0]
    keys.forEach(key => {
    	if(uniqKeys.indexOf(key) === -1){
      	uniqKeys.push(key)
      }
    })
    return [...uniqKeys]
  }, [])
  
  /* console.log(uniqCols) */
  
  //Get the unique ids
  let uniqRows = dataSources.reduce((uniqKeys, source) => {
  	const keyIndex = source[0].indexOf(key)
    if(keyIndex !== -1){
      source.forEach(entry => {
    		if(uniqKeys.indexOf(entry[keyIndex]) === -1){
      		uniqKeys.push(entry[keyIndex])
      	}
      })
    }
    return [...uniqKeys]
  }, []).slice(1)
  
  //Transform the datasets
  const d1 = transformData(dataSources[0])
  
  console.log(d1)
}

mergeDataByKey(personDataSources, "id");


// Expected Output - Order is not important
// [
//   ["id", "name", "height", "age", "weight", "cool", "parent"],
//   ["1", "John", "45", "21", "150", "true", "yes"],
//   ["2", "Bob", "50", "23", "90", "false", "yes"],
//   ["3", "Susan", "48", "20", "120", "true", ""],
//   ["4", "Ben", "", "20", "100", "true", ""],
// ];