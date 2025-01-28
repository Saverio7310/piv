import Product from "./Product.js";

export default class LocalStorage {
    static #storage = localStorage;
    static shoppingCartKey = 'ShoppingCart';

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

    static #addProductToShoppingCart(cart, product) {
        if (cart) {
            cart.push(product);
            return cart;
        } else {
            return [ product ];
        }
    }
    static #updateProductInShoppingCart(cart, product) {
        return cart.map((prod) => {
            if (prod.id !== product.getId)
                return prod;
            return product;
        });
    }
    static #deleteProductFromShoppingCart(cart, product) {
        return cart.filter((prod) => prod.id !== product.getId);
    }

    /**
     * 
     * @param {Product[]} cart 
     * @returns 
     */
    static saveShoppingCart(action, product) {
        const cart = this.getValue(this.shoppingCartKey);
        let valueToSave = null;
        switch (action) {
            case 'add':
                valueToSave = this.#addProductToShoppingCart(cart, product);
                break;
            case 'update':
                valueToSave = this.#updateProductInShoppingCart(cart, product);
                break;
            case 'remove':
                valueToSave = this.#deleteProductFromShoppingCart(cart, product);
                break;
            default:
                console.log('TODO');
                break;
        }
        this.setValue(this.shoppingCartKey, valueToSave);
    }

    static getShoppingCart() {
        const cart = this.getValue(this.shoppingCartKey);
        if (!cart)
            return null;
        return cart.map((prod) => Product.createInstance(prod));
    }

    static clearShoppingCart() {
        this.clearValues(this.shoppingCartKey);
    }
}