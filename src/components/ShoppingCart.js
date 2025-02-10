import { useContext, useEffect, useState } from "react";
import copy from 'copy-to-clipboard'

import { CartContext } from "./CartProvider";
import { ToastContext } from "./ToastProvider";
import ShoppingCartProductsList from "./ShoppingCartProductsList";
import ShoppingCartSupermarketsSelection from "./ShoppingCartSupermarketsSelection";
import ShoppingCartOptimizedList from "./ShoppingCartOptimizedList";
import shoppingCartOptimization from "../utils/optimizeShoppingCart";

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

    function handleShoppingCartOptimization() {
        const finalArray = shoppingCartOptimization(selectedSupermarkets, cart);
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
        addToast({ type: TYPES.success, message: `Prodotto rimosso dal carrello` });
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
        addToast({ type: TYPES.success, message: `Carrello svuotato` });
    }

    function handleShoppingListCopy() {
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
            addToast({ type: TYPES.info, message: `Lista della spesa copiata!` });
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
                            <button className="copy-button primary-button" onClick={handleShoppingListCopy}>Copia lista della spesa</button>
                        </div>
                    </div>
                }
            </ShoppingCartSupermarketsSelection>
        </main>
    );
}

export default ShoppingCart;