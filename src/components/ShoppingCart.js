import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartProvider";

import '../styles/shoppingCart.css'
import Product from "../model/Product";
import { ImBin } from 'react-icons/im';
import { FaPlus, FaMinus } from 'react-icons/fa6'
import { ToastContext } from "./ToastProvider";
import LocalStorage from "../model/LocalStorage";

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

    const supermarkets = ['Supermercato 1', 'Supermercato 2', 'Supermercato 3'];

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
        addToast({ id: id, type: TYPES.success, message: `Prodotto rimosso dal carrello`});
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
    }

    if (cart.length === 0) {
        return (
            <main>
                <h1>Nessun prodotto nel carrello!</h1>
            </main>
        );
    }
    return (
        <main>
            <section className="shopping-cart-section">
                <h1>Prodotti selezionati</h1>
                <ul className="product-list">
                    {cart.map((prod) => {
                        return (
                            <li key={`shopping-cart-${prod.getId}`} className="product-list-item">
                                <div className="product-list-item-content">
                                    <div className="product-list-item-element product-list-item-image">
                                        <img src={prod.getImage} alt="Product" style={{ widows: '5rem', height: '5rem' }} />
                                    </div>
                                    <div className="product-list-item-element product-list-item-name">
                                        <h1 className="product-list-item-h1">{prod.getName}</h1>
                                    </div>
                                    <div className="product-list-item-element product-list-item-prices">
                                        {prod.getPrices.map((price, index) => {
                                            const lastPrice = price.getLatestPrice();
                                            const nowDiscounted = price.isNowDiscounted();
                                            return (
                                                <h1 key={`product-prices-${index}`} className={`product-list-item-h1 ${nowDiscounted ? 'discount' : ''}`}>€{lastPrice.toFixed(2)}</h1>
                                            );
                                        })}
                                    </div>
                                    <div className="product-list-item-element product-list-item-quantity center-content">
                                        <ImBin className="product-list-item-svg" onClick={() => handleProductDeletion(prod)}></ImBin>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div className="shopping-cart-info-container">
                    <p className="product-list-item-p">* I prezzi in sconto sono segnalati in arancione</p>
                    <div className="shopping-cart-deletion-container">
                        <button className="shopping-cart-deletion-button" onClick={handleShoppingCartDeletion}>Svuota carrello</button>
                    </div>
                </div>
            </section>
            <section className="shopping-cart-section">
                <h1>Ottimizzazione spesa</h1>
                <section className="shopping-cart-section">
                    <h1>Seleziona i supermercati desiderati</h1>
                    <div className="product-list-item">
                        <div className="product-list-item-content">
                            {supermarkets.map((supermarket, index) => {
                                return (
                                    <div key={`supermarkets-selection-${index}`} className="container">
                                        <label htmlFor={`supermarket-input-${index}`} className="center-content supermarket-input-label stack">{supermarket}</label>
                                        <input
                                            id={`supermarket-input-${index}`}
                                            type="checkbox"
                                            className="supermarket-input-checkbox stack"
                                            value={supermarket}
                                            onChange={(e) => handleCheckboxChange(e.target.value, e.target.checked)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="center-content inner-spacing">
                            <button className="main-function-button" onClick={handleShoppingCartOptimization}>Ottimizza</button>
                        </div>
                    </div>
                </section>
                {optimizedShoppingCart.map(({ supermarketName, products }) => {
                    return (
                        <section className="shopping-cart-section" key={`supermarket-section-${supermarketName}`}>
                            <h1>{supermarketName}</h1>
                            <ul className="product-list">
                                {products.map(({ productID, minPrice, isDiscounted }) => {
                                    const prod = cart.find((product) => product.getId === productID);
                                    return (
                                        <li key={`minimum-price-product-${prod.getId}`} className="product-list-item">
                                            <div className="product-list-item-content">
                                                <div className="product-list-item-element product-list-item-image">
                                                    <img src={prod.getImage} alt="Product" style={{ widows: '5rem', height: '5rem' }} />
                                                </div>
                                                <div className="product-list-item-element product-list-item-name section-product-name">
                                                    <h1 className="product-list-item-h1">{prod.getName}</h1>
                                                </div>
                                                <div className="product-list-item-element product-list-item-name section-product-price">
                                                    <h1 className={`product-list-item-h1 ${isDiscounted ? 'discount' : ''}`}>€{(prod.getCount * minPrice).toFixed(2)}</h1>
                                                </div>
                                                <div className="product-list-item-element product-list-item-quantity center-content">
                                                    <div className="product-list-item-quantity-content center-content">
                                                        <div className="shopping-cart-product-count-button minus-button-icon">
                                                            <FaMinus className="shopping-cart-product-count-button-icon" onClick={() => handleProductCountChange(prod, -1)} />
                                                        </div>
                                                        <p className="product-list-item-p">Quantità: {prod.getCount}</p>
                                                        <div className="shopping-cart-product-count-button plus-button-icon">
                                                            <FaPlus className="shopping-cart-product-count-button-icon" onClick={() => handleProductCountChange(prod, 1)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    );
                })}
            </section>
        </main>
    );
}

export default ShoppingCart;