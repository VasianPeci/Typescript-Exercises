"use strict";
function pick(obj, keys) {
    const returnObj = {};
    keys.forEach(key => {
        returnObj[key] = obj[key];
    });
    return returnObj;
}
//example
const obj = {
    a: 1,
    b: 2,
    c: 3
};
console.log(obj);
const pickedObject = pick(obj, ["a", "b"]);
console.log(pickedObject);
