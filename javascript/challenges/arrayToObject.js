//LEVEL: EASY

//Given the keys in first index of array
//Convert the array to an array of objects with corresponding keys and values

//Example:
const inputArray = [
    ["id", "name", "parent"], //key names
    ["2", "Bob", "yes"],
    ["1", "John", "no"],
];

const expectedOutput = [
    {"id": "2", "name": "Bob", "parent": "yes"},
    {"id": "1", "name": "John", "parent": "no"},
]

// -------------------------------- Solution -------------------------------//
function arrayToObject(array) {
    const objKeys = array[0];

    return array.slice(1).reduce((acc, curr) => {
        const obj = {}
        objKeys.forEach((key, i) => obj[key] = curr[i])
        return [...acc, obj]
    }, []);
}

const input = [
    ["id", "name", "parent"],
    ["2", "Bob", "yes"],
    ["1", "John", "no"],
];

console.log(arrayToObject(input));