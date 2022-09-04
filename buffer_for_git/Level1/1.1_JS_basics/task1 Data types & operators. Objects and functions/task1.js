function Product(ID) {
    this.ID = ID;
    this.name;
    this.description;
    this.price;
    this.brand;
    this.sizes = [];
    this.activeSize;
    this.quantity;
    this.date;
    this.reviews = {};
    this.images = [];

    function Review(author, date, comment, rating) {
        this.author = author;
        this.date = date;
        this.comment = comment;
        this.rating = rating;
    }

    this.getID = function () {
        return this.ID;
    }

    this.setID = function (newID) {
        this.ID = newID;
    }

    this.getName = function () {
        return this.name;
    }

    this.setName = function (newName) {
        this.name = newName;
    }

    this.getDescription = function () {
        return this.description;
    }

    this.setDescription = function (newDescription) {
        this.description = newDescription;
    }

    this.getPrice = function () {
        return this.price;
    }

    this.setPrice = function (newPrice) {
        this.price = newPrice;
    }

    this.getBrand = function () {
        return this.brand;
    }

    this.setBrand = function (newBrand) {
        this.brand = newBrand;
    }

    this.getSizes = function () {
        return this.sizes;
    }

    this.setSizes = function (newSizes) {
        this.sizes = newSizes;
    }

    this.getActiveSize = function () {
        return this.activeSize;
    }

    this.setActiveSize = function (newActiveSize) {
        this.activeSize = newActiveSize;
    }

    this.getQuantity = function () {
        return this.quantity;
    }

    this.setQuantity = function (newQuantity) {
        this.quantity = newQuantity;
    }

    this.getDate = function () {
        return this.date;
    }

    this.setDate = function (newDate) {
        this.date = newDate;
    }

    this.getReviews = function () {
        return this.reviews;
    }

    this.setReviews = function (newReviews) {
        this.reviews = newReviews;
    }

    this.getImages = function () {
        return this.images;
    }

    this.setImages = function (newImages) {
        this.images = newImages;
    }

    this.getImage = function (index) {
        return this.images[index == undefined ? 0 : index];
    }

    this.addSize = function (size) {
        this.sizes.push(size);
    }

    this.deleteSize = function (size) {
        delete this.sizes[this.sizes.indexOf(size)];
    }

    this.addReview = function (ID, author, date, comment, rating) {
        this.reviews[ID] = new Review(author, date, comment, rating);
    }

    this.deleteReview = function (ID) {
        delete this.reviews[ID];
    }

    this.getAverageRating = function () {
        ratingSum = 0;
        prosessedNumber = 0;
        for (reviewKey in this.reviews) {
            for (ratingKey in this.reviews[reviewKey].rating) {
                ratingSum += this.reviews[reviewKey].rating[ratingKey];
                prosessedNumber++;
            }
        }
        return ratingSum / prosessedNumber;
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
        if (element.getName() != undefined && element.getName().includes(search) ||
            element.getDescription() != undefined && element.getDescription().includes(search)) {
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

// testing...

let pencil = new Product(00);
pencil.setImages(['image1', 'image2'])
pencil.addReview(1, 'Ramil', '22.02.2022', 'dood', { '1': 0, '21': 0 });
pencil.addReview(2, 'Ramil', '22.02.2022', 'dood', { 'price': 0, 'quality': 10 });
pencil.deleteReview(1);
pencil.addSize('XXXXL');
pencil.addSize('L');
pencil.deleteSize('L');
pencil.setName('pencil');
pencil.setDescription('red pencil');
pencil.setPrice(5);
//console.log(pencil.getName().includes('coc'));

let cola = new Product(01);
cola.setName('coca cola');
cola.setDescription('classic cola');
cola.setPrice(15);
//console.log(searchProducts([pencil, cola, paper], 'penn'));

let paper = new Product(02);
paper.setName('paper');
paper.setPrice(12);
console.log(sortProducts([paper, pencil, paper, cola, paper], 'ID'));

//console.log(pencil.getAverageRating() + ' +/n' + pencil.getSizes());