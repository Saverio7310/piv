import printCurrentInfo from "../utils/logObject.js";
import Product from "./Product.js";

export default class SessionStorage {
    static #storage = sessionStorage;
    static productListKey = 'ProductsList';
    static pagePathKey = 'PagePath';
    static pageYcoordKey = 'PageYcoord';
    static selectedProductKey = 'SelectedProduct';

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

    /**
     * Save or update the products fetched
     * @param {Object} fetchedProducts - Array of objects to store in the sessionStorage
     * @param {string} fetchedProducts.searchQuery - Search query input value
     * @param {number} fetchedProducts.iteration - Fetching iteration
     * @param {Product[]} fetchedProducts.products - Array of fetched products
     * @returns {undefined}
     */
    static saveProductList(fetchedProducts) {
        const prodsList = this.getValue(this.productListKey);
        if (!prodsList) {
            return this.setValue(this.productListKey, fetchedProducts);
        }
        if (prodsList.searchQuery !== fetchedProducts.searchQuery) {
            return this.setValue(this.productListKey, fetchedProducts);
        }
        fetchedProducts.products = prodsList.products.concat(fetchedProducts.products);
        return this.setValue(this.productListKey, fetchedProducts);
    }

    /**
     * Retrieve the products if they exists
     * @returns {Object|null} fetchedProducts - Array of objects stored in the sessionStorage
     * @returns {string} fetchedProducts.searchQuery - Search query input value
     * @returns {number} fetchedProducts.iteration - Fetching iteration
     * @returns {Product[]} fetchedProducts.products - Array of fetched products
     */
    static getProductList() {
        const list = this.getValue(this.productListKey);
        if (!list)
            return null;
        const prodArray = list.products.map((prod) => Product.createInstance(prod));
        return {
            ...list,
            products: prodArray,
        };
    }

    static clearProductList() {
        return this.removeValue(this.productListKey);
    }

    /**
     * Save selected product
     * @param {Product} prod 
     */
    static saveSelectedProduct(prod) {
        this.setValue(this.selectedProductKey, prod);
    }

    static getSelectedProduct() {
        const prod = this.getValue(this.selectedProductKey);
        if (!prod)
            return null;
        return Product.createInstance(prod);
    }
}