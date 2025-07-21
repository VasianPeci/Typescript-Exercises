function pick<Type, Key extends keyof Type> (obj: Type, keys: Key[]): {[K in Key]: Type[K]} {
    const returnObj = {} as {[K in Key]: Type[K]};
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
}
console.log(obj);

const pickedObject = pick(obj, ["a", "b"]);
console.log(pickedObject);
