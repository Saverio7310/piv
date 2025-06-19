import { useContext, useEffect, useState } from "react";

import { CartContext } from "./CartProvider";
import { ToastContext } from "./ToastProvider";
import ShoppingCartProductsList from "./ShoppingCartProductsList";
import ShoppingCartSupermarketsSelection from "./ShoppingCartSupermarketsSelection";
import ShoppingCartOptimizedList from "./ShoppingCartOptimizedList";
import shoppingCartOptimization from "../utils/optimizeShoppingCart";
import copyShoppingListToClipboard from "../utils/generateShoppingList";

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
        if (cart.length === 0 && Array.isArray(products) && products.length !== 0) {
            handleRestoreProducts(products);
        }
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
        if (incrementValue === -1 && actualCount === 1) return;
        if (incrementValue === 1 && actualCount === 20) return;
        handleUpdateProduct(prod, incrementValue);
    }

    function handleShoppingCartDeletion() {
        handleRestoreProducts([]);
        LocalStorage.clearShoppingCart();
        addToast({ type: TYPES.success, message: `Carrello svuotato` });
    }

    function handleShoppingListCopyToClipboard() {
        const success = copyShoppingListToClipboard(optimizedShoppingCart, cart);
        if (success) addToast({ type: TYPES.info, message: 'Lista della spesa copiata!' });
        else addToast({ type: TYPES.warning, message: 'Errore durante la copia della lista!' });
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
                            key={supermarketName}
                            supermarketName={supermarketName}
                            products={products}
                            handleProductCountChange={handleProductCountChange} />)
                }
                {
                    optimizedShoppingCart.length !== 0 &&
                    <div className="shopping-cart-info-container lateral-padding">
                        <div className="copy-button-container">
                            <button className="copy-button primary-button" onClick={handleShoppingListCopyToClipboard}>Copia lista della spesa</button>
                        </div>
                    </div>
                }
            </ShoppingCartSupermarketsSelection>
        </main>
    );
}

export default ShoppingCart;