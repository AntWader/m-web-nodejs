
/**
 * @abstract
 */
function Product(ID, name, description, price, brand, quantity) {

    if (this.constructor === Product) {
        throw new Error("Can't instantiate abstract class!");
    }

    this.ID = ID;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.quantity = quantity;
    this.date = new Date().toUTCString();
    this.reviews = {};
    this.images = [];

    /**
     * Getter and setter method. If defines only first property 
     * parameter, method works as getter. In case if defines both 
     * property and value parameter, method works as setter.
     * 
     * @param {String} property 
     * @param {*} value 
     * @returns current value (get), or old value (set)
     */
    this.getAxess = function (property, value) {
        if (value == undefined) return this[property]

        let val = this[property]
        this[property] = value
        return val
    }

    this.getImage = function (index) {
        return this.images[index == undefined ? 0 : index];
    }

    this.addReview = function (reviewID, author, date, comment, rating) {
        this.reviews[reviewID] = {
            'author': author,
            'date': date,
            'comment': comment,
            'rating': rating
        }
    }

    this.deleteReview = function (reviewID) {
        delete this.reviews[reviewID];
    }

    this.getAverageRating = function () {
        let ratingSum = 0;
        let prosessedNumber = 0;
        for (let reviewID in this.reviews) {
            ratingSum += this.reviews[reviewID]['rating'];
            prosessedNumber++;
        }
        return ratingSum / prosessedNumber;
    }

    this.getFullInformation = function () {
        let strInfo = ""
        for (let prop in this) {
            if (typeof this[prop] != 'function') {
                strInfo += prop + ": " + this[prop] + "\n"
            }
        }

        return strInfo
    }

    this.getPriceForQuantity = function (n) {
        return n * this.price
    }
}

/**
 * Function for searching Product[] elements with matches strings 
 * from Product.name or Product.description.
 * 
 * @param {Product[]} products Product array to search for matches
 * @param {String} search string to search
 * @returns matched Product obgects array
 */
function searchProducts(products, search) {
    let foundMatches = [];

    products.forEach(element => {
        if (element.getAxess("name") != undefined &&
            element.getAxess("name").includes(search) ||
            element.getAxess("description") != undefined &&
            element.getAxess("description").includes(search)) {

            foundMatches.push(element);
        }
    });

    return foundMatches;
}

/**
 * Functions for sorting Product[] by Product objects property name. * 
 * 
 * @param {Product[]} products Product array to sort
 * @param {String} sortRule Product object property name
 * @returns Product array sorted by elements property name
 */
function sortProducts(products, sortRule) {
    let sortedProducts = [].concat(products);

    sortedProducts.sort(function (a, b) {
        if (a[sortRule] > b[sortRule]) return 1;
        if (a[sortRule] < b[sortRule]) return -1;
        return 0;
    });

    return sortedProducts;
}

/**
 * Class Clothes
 */
function Clothes(color, material) {
    Product.apply(this, Array.prototype.slice.call(arguments, 2));
    this.color = color;
    this.material = material;
}
Clothes.prototype = Object.create(Product.prototype);
Clothes.prototype.constructor = Clothes;

/**
 * Class Electronics
 */
function Electronics(warranty, power) {
    Product.apply(this, Array.prototype.slice.call(arguments, 2));
    this.warranty = warranty;
    this.power = power;
}
Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;

// testing...

let cl1 = new Clothes('green', 'cotton', 1, 'clothes1', 'Clothes description...', 1000, 'brand', 'quantity');
let cl2 = new Clothes('red', 'cotton', 2, 'clothes2', 'Clothes description...', 50);
let el1 = new Electronics(12, 100, 11, 'electronics1', 'Electronics description...', 1500);
let el2 = new Electronics(5, 100, 12, 'electronics2', 'Electronics description...', 1);

console.log(cl1.getFullInformation());
console.log(cl2.getFullInformation());
console.log(el1.getFullInformation());
console.log(el2.getFullInformation());

console.log(searchProducts([cl1, cl2, el1, el2], '2').map(e => e.name));
console.log(sortProducts([cl1, cl2, el1, el2], 'price').map(e => e.name));