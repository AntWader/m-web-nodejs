"use strict";
function mapObject(obj, transformer) {
    let newObj = {};
    for (const key of Object.keys(obj)) {
        newObj[key] = transformer(obj[key]);
    }
    return newObj;
}
let test = { "roma": 5, "vasya": 2 };
console.log(mapObject(test, (x) => x > 2));
