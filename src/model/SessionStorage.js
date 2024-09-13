export default class SessionStorage {
    static #storage = sessionStorage;
    static productListKey = 'ProductsList';
    static pagePathKey = 'PagePath';
    static pageYcoordKey = 'PageYcoord';

    static setValue(key, value) {
        if (typeof value !== 'string')
            value = JSON.stringify(value);
        this.#storage.setItem(key, value);
    }

    static getValue(key) {
        const elementString = this.#storage.getItem(key);
        if (elementString)
            return JSON.parse(elementString);
        return null;
    }

    static removeValue(key) {
        this.#storage.removeItem(key);
    }

    static clearValues() {
        this.#storage.clear();
    }

    /*
    products object
    this.productListKey: {
        searchQuery: string,
        products: string[],
        pageYcoord: number
    }
    */
    /**
     * Save or update the products fetched
     * @param {Object} fetchedProducts - Array of objects to store in the sessionStorage
     * @param {string} fetchedProducts.searchQuery - Search query input value
     * @param {number} fetchedProducts.pageYcoord - Y position of the page
     * @param {string[]} fetchedProducts.products - Array of fetched products
     * @returns {undefined}
     */
    static saveProductList(fetchedProducts) {
        const prodsList = this.getValue(this.productListKey);
        if (!prodsList) {
            console.log('No products saved before')
            return this.setValue(this.productListKey, fetchedProducts);
        }
        if (prodsList.searchQuery !== fetchedProducts.searchQuery) {
            console.log('Different searchQuery', prodsList.searchQuery, ', ', fetchedProducts.searchQuery)
            return this.setValue(this.productListKey, fetchedProducts);
        }
        console.log('Equal searchQuery', prodsList.searchQuery, ', ', fetchedProducts.searchQuery)
        fetchedProducts.products = prodsList.products.concat(fetchedProducts.products);
        return this.setValue(this.productListKey, fetchedProducts);
    }

    /**
     * Retrieve the products if they exists
     * @returns {Object|null} fetchedProducts - Array of objects stored in the sessionStorage
     * @returns {string} fetchedProducts.searchQuery - Search query input value
     * @returns {number} fetchedProducts.pageYcoord - Y position of the page
     * @returns {string[]} fetchedProducts.products - Array of fetched products
     */
    static getProductList() {
        return this.getValue(this.productListKey);
    }

    static clearProductList() {
        return this.removeValue(this.productListKey);
    }
}