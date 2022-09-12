interface objectA {
    [key: string]: undefined | { cvalue: undefined | number | string | objectA }
}


function summ(a: objectA): number {
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (elem === undefined || elem.cvalue === undefined) return 2022;
        if (typeof elem.cvalue === 'string') return +elem.cvalue || 2022;
        if (typeof elem.cvalue === 'object') return summ(elem.cvalue);
        return elem.cvalue;
    });
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}

///testing...
import util from 'util';

function summTester(a: objectA, expected: number) {
    console.log(`\ntest summ(a), a = ${util.inspect(a, { showHidden: false, depth: null, colors: true })}`)
    let res = summ(a)
    console.log(
        `${res === expected ? "\x1b[32mok " : "\x1b[31merr"} result: ${res}\x1b[37m, expected: ${expected}`
    )
}

summTester( //empty
    {},
    0
)
summTester( //test sample from task
    { hello: { cvalue: 1 }, world: { cvalue: { yay: { cvalue: "2" } } } },
    3
)
summTester( //unparseable string number
    { num: { cvalue: '1st' } },
    2022
)
summTester( //undefined
    { undef: undefined, ined: { cvalue: undefined } },
    4044
)

summTester( //recursion
    { u: { cvalue: { u: { cvalue: { u: { cvalue: { u: { cvalue: { u: { cvalue: undefined } } } } } } } } } },
    2022
)
