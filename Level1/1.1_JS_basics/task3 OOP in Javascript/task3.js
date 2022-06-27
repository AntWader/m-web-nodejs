
/**
 * @abstract
 */
class Product {

    constructor() {
        if (this.constructor === Product) {
            throw new Error("Can't instantiate abstract class!");
        }
    }

    ID;
    name;
    description;
    price;
    brand;
    quantity;
    date;
    reviews = {};
    images = [];

    getAxess(property, value) {
        if (value == undefined) return this[property]

        let val = this[property]
        this[property] = value
        return val
    }

    getImage(index) {
        return this.images[index == undefined ? 0 : index];
    }

    addReview(reviewID, author, date, comment, rating) {
        this.reviews[reviewID] = {
            'author': author,
            'date': date,
            'comment': comment,
            'rating': rating
        }
    }

    deleteReview(reviewID) {
        delete this.reviews[reviewID];
    }

    getAverageRating() {
        let ratingSum = 0;
        let prosessedNumber = 0;
        for (let reviewID in this.reviews) {
            ratingSum += this.reviews[reviewID]['rating'];
            prosessedNumber++;
        }
        return ratingSum / prosessedNumber;
    }

    getFullInformation() {
        this.strInfo = ""
        for (let prop in this) {
            this.strInfo += prop + ": " + this[prop] + "\n"
        }

        return this.strInfo
    }

    getPriceForQuantity(n) {
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
    this.foundMatches = [];

    products.forEach(element => {
        if (element.getAxess("name") != undefined &&
            element.getAxess("name").includes(search) ||
            element.getAxess("description") != undefined &&
            element.getAxess("description").includes(search)) {

            this.foundMatches.push(element);
        }
    });

    return this.foundMatches;
}

/**
 * Functions for sorting Product[] by Product objects property name. * 
 * 
 * @param {Product[]} products Product array to sort
 * @param {String} sortRule Product object property name
 * @returns Product array sorted by elements property name
 */
function sortProducts(products, sortRule) {
    this.sortedProducts = [].concat(products);

    this.sortedProducts.sort(function (a, b) {
        if (a[sortRule] > b[sortRule]) return 1;
        if (a[sortRule] < b[sortRule]) return -1;
        return 0;
    });

    return this.sortedProducts;
}

/**
 * 
 */
class Clothes extends Product {

    color;
    material;

    constructor(ID, name, description, price, brand, quantity, date, color, material) {
        super()
        this.ID = ID
        this.name = name
        this.description = description
        this.price = price
        this.brand = brand
        this.quantity = quantity
        this.date = date
        this.color = color
        this.material = material
    }
}

class Electronics extends Product {

    warranty;
    power;

    constructor(ID, name, description, price, brand, quantity, date, warranty, power) {
        super()
        this.ID = ID
        this.name = name
        this.description = description
        this.price = price
        this.brand = brand
        this.quantity = quantity
        this.date = date
        this.warranty = warranty
        this.power = power
    }
}