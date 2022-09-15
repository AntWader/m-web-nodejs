
function mapObject<Value, Result>(obj: Record<string, Value>, transformer: (val: Value) => Result) {
    let newObj: Record<string, Result> = {}

    for (const key of Object.keys(obj)) {
        newObj[key] = transformer(obj[key])
    }

    return newObj
}


let test = { "roma": 5, "vasya": 2 }
console.log(mapObject(test, (x) => x > 2))
