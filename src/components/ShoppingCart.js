import { useContext, useEffect, useState } from "react";
import copy from 'copy-to-clipboard'

import { CartContext } from "./CartProvider";
import { ToastContext } from "./ToastProvider";
import ShoppingCartProductsList from "./ShoppingCartProductsList";
import ShoppingCartSupermarketsSelection from "./ShoppingCartSupermarketsSelection";
import ShoppingCartOptimizedList from "./ShoppingCartOptimizedList";

import Product from "../model/Product";
import LocalStorage from "../model/LocalStorage";

import '../styles/ShoppingCart.css';
import '../styles/ShoppingCartSharedStyle.css';

function ShoppingCart() {
    const { cart, handleRemoveProduct, handleUpdateProduct, handleRestoreProducts } = useContext(CartContext);
    const { addToast, TYPES } = useContext(ToastContext);
    const [selectedSupermarkets, setSelectedSupermarkets] = useState([]);
    const [optimizedShoppingCart, setOptimizedShoppingCart] = useState([]);

    useEffect(() => {
        const products = LocalStorage.getShoppingCart();
        console.log('UseEffect Shopping Cart - preloading');
        console.log(products);
        if (cart.length === 0 && Array.isArray(products) && products.length !== 0)
            handleRestoreProducts(products);
    }, [cart.length, handleRestoreProducts]);

    function handleCheckboxChange(supermarketName, isChecked) {
        let found = false;
        const newSelectedSupermarkets = selectedSupermarkets.map(({ key, value }) => {
            if (key === supermarketName) {
                found = true;
                return { key: supermarketName, value: isChecked };
            } else {
                return { key, value };
            }
        });
        if (!found)
            newSelectedSupermarkets.push({ key: supermarketName, value: isChecked });
        setSelectedSupermarkets(newSelectedSupermarkets);
    }

    /**
     * Returns a Set containing the selected supermarkets among the available ones
     * @param {Object[]} selectedSupermarkets - Supermarkets array
     * @param {string} selectedSupermarkets.key - Supermarket's name
     * @param {boolean} selectedSupermarkets.value - Boolean value that points out the 
     * selection of the user: true if it's been selected, false otherwise
     * @returns {Set<string>}
     */
    function filterSelectedSupermarkets(selectedSupermarkets) {
        return new Set(
            selectedSupermarkets
                .filter(({ _, value }) => value === true)
                .map(({ key, _ }) => key)
        );
    }

    /**
     * Returns, for the selected product, an object that contains the smallest price, its 
     * related supermarket and whether it's actually discounted or not
     * @param {Product} product - Poduct to check
     * @param {Set<string>} supermarketsSet - Set of selected supermarkets
     * @returns {Object} 
     */
    function findMinimumPriceForProduct(product, supermarketsSet) {
        const productID = product.getId;
        let supermarket = '';
        let minPrice = Number.MAX_SAFE_INTEGER;
        let isDiscounted = false;
        product.getPrices.forEach((price) => {
            if (supermarketsSet.has(price.getSupermarketName)) {
                const latestPrice = price.getLatestPrice();
                if (latestPrice < minPrice) {
                    supermarket = price.getSupermarketName;
                    minPrice = latestPrice;
                    isDiscounted = price.isNowDiscounted();
                }
            }
        });
        return { productID, supermarket, minPrice, isDiscounted };
    }

    /**
     * Returns an array of objects. Each object contains the supermarket name and an
     * array containig all the products that have the smallest price
     * @param {Set<string>} supermarketsSet - Set of selected supermarkets
     * @param {Object[]} product_supermarket_array - Array of products' info
     * @returns {Object[]}
     */
    function findProductsBySupermarket(supermarketsSet, product_supermarket_array) {
        const finalArray = [];
        for (const supermarket of supermarketsSet.values()) {
            const arr = product_supermarket_array.filter((sup) => sup.supermarket === supermarket);
            if (arr.length === 0)
                continue;
            const obj = {
                supermarketName: supermarket,
                products: arr,
            };
            finalArray.push(obj);
        }

        finalArray.sort((a, b) => a.supermarketName.localeCompare(b.supermarketName));

        return finalArray;
    }

    function handleShoppingCartOptimization() {
        const supermarketsSet = filterSelectedSupermarkets(selectedSupermarkets);

        const product_supermarket_array = cart.map((product) => {
            return findMinimumPriceForProduct(product, supermarketsSet);
        });

        const finalArray = findProductsBySupermarket(supermarketsSet, product_supermarket_array);

        setOptimizedShoppingCart(finalArray);
    }

    function handleProductDeletion(product) {
        handleRemoveProduct(product);
        const optList = [];
        optimizedShoppingCart.forEach(({ supermarketName, products }) => {
            const prods = products.filter((prod) => prod.productID !== product.getId);
            if (prods.length !== 0) {
                const obj = {
                    supermarketName,
                    products: prods,
                };
                optList.push(obj);
            }
        });
        setOptimizedShoppingCart(optList);
        const id = Date.now();
        addToast({ id: id, type: TYPES.success, message: `Prodotto rimosso dal carrello` });
        /* setSelectedSupermarkets([]);
        setOptimizedShoppingCart([]);
        handleRemoveProduct(prodID); */
    }

    function handleProductCountChange(prod, incrementValue) {
        const actualCount = prod.getCount;
        if (incrementValue === -1 && actualCount === 1)
            return;
        if (incrementValue === 1 && actualCount === 20)
            return;
        handleUpdateProduct(prod, incrementValue);
    }

    function handleShoppingCartDeletion() {
        handleRestoreProducts([]);
        LocalStorage.clearShoppingCart();
        const id = Date.now();
        addToast({ id: id, type: TYPES.success, message: `Carrello svuotato` });
    }

    function copyShoppingList() {
        let text = '';
        let total = 0;
        optimizedShoppingCart.forEach(({ supermarketName, products }) => {
            let partial = 0;
            text += supermarketName + ':';
            products.forEach((product) => {
                const prod = cart.find((p) => p.getId === product.productID);
                const line = `\n- ${prod.getName} x${prod.getCount}, €${(prod.getCount * product.minPrice).toFixed(2)}`;
                text += line;
                partial += product.minPrice * prod.getCount;
            })
            text += `\nPARZIALE: €${partial.toFixed(2)}\n\n`;
            total += partial;
            partial = 0;
        })
        text += `TOTALE SPESA: €${total.toFixed(2)}`;
        const copyResult = copy(text, {message: "Lista salvata"});
        if (copyResult) {
            const id = Date.now();
            addToast({id: id, type: TYPES.info, message: `Lista della spesa copiata!` });
        }
    }

    if (cart.length === 0) {
        return (
            <main>
                <h1 className="empty-cart-message">Nessun prodotto nel carrello!</h1>
            </main>
        );
    }
    return (
        <main>
            <ShoppingCartProductsList
                handleProductDeletion={handleProductDeletion}
                handleShoppingCartDeletion={handleShoppingCartDeletion} />
            <ShoppingCartSupermarketsSelection
                handleCheckboxChange={handleCheckboxChange}
                handleShoppingCartOptimization={handleShoppingCartOptimization} >
                {
                    optimizedShoppingCart.map(({ supermarketName, products }) =>
                        <ShoppingCartOptimizedList
                            supermarketName={supermarketName}
                            products={products}
                            handleProductCountChange={handleProductCountChange} />)
                }
                {
                    optimizedShoppingCart.length !== 0 &&
                    <div className="shopping-cart-info-container lateral-padding">
                        <div className="copy-button-container">
                            <button className="copy-button primary-button" onClick={copyShoppingList}>Copia lista della spesa</button>
                        </div>
                    </div>
                }
            </ShoppingCartSupermarketsSelection>
        </main>
    );
}

export default ShoppingCart;