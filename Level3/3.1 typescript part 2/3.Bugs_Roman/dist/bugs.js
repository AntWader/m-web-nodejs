"use strict";
// @ts-ignore comment
function summ(a) {
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (typeof elem === undefined)
            return 2022;
        if (typeof elem.cvalue === 'string')
            return +elem.cvalue || 2022;
        if (typeof elem.cvalue === 'object')
            return summ(elem.cvalue);
        return elem.cvalue;
    });
    let sum = 0;
    console.log(x);
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}
let test1 = { hello: { cvalue: 1 }, world: { cvalue: { yay: { cvalue: "2" } } } };
let test2 = { yay: { cvalue: "2" } };
console.log(summ(test1));
console.log(summ(test2));
