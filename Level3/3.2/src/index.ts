function findProperty(name: string, obj: Record<string, any>): any {
    let keys = Object.keys(obj)
    console.log(keys)
    if (keys.length < 1) {
        return null
    } else {
        for (let key of keys) {
            if (key === name) {
                return obj[key]
            } else {
                let newObj = obj[key]
                if (
                    typeof newObj === 'object' &&
                    !Array.isArray(newObj) &&
                    newObj !== null
                ) {
                    let prop = findProperty(name, newObj)
                    if (prop !== null) return prop
                }
            }
        }
        //no matches found
        return null
    }
}

let obj0 = {id: 0, 'book-k': "books-data"}
let obj1 = {name: {id: 0, 'book-k': "books-data"}}
let obj2 = {id: {id: {name: {id: 0, 'book-k': "books-data"}}}}

console.log(findProperty('book-k', obj0))

console.log(findProperty('book-k', obj1))

console.log(findProperty('book-k', obj2))