
let CSVParser = function (filepath) {
    const { equal } = require('assert');
    let fs = require('fs');
    let fileContent = fs.readFileSync(filepath, 'utf8');
    dictionary = fileContent
        .split('\r\n')
        .filter(row => row.length != 0 && row.charAt(0) != '#')
        .map(row => row.split(','))
        .map(row => ({ x: row[0], y: row[1], name: row[2], population: row[3] }))
        .sort((a, b) => b.population - a.population)
        .slice(0, 10)
        .reduce(function (arr, current) {
            arr[current.name] =
                { population: current.population, rating: Object.keys(arr).length + 1 }
            return arr;
        }, {})

    return (text) =>
        text.replace(
            new RegExp(Object.keys(dictionary).join('|'), 'g'),
            city => city +
                ' (' + dictionary[city].rating + ' місце у ТОП-10 найбільших міст України' +
                ', населення ' + dictionary[city].population + ' осіб)'
        )
}

// testing...

par = new CSVParser('test.csv')
console.log(par('Вінниця вінниця Вінниця'))