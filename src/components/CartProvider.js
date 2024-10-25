import { createContext, useReducer } from "react";

import Product from "../model/Product";
import LocalStorage from "../model/LocalStorage";

export const CartContext = createContext();

/**
 * 
 * @param {Product[]} state 
 * @param {Object} action 
 * @param {string} action.type
 * @param {Product} action.product
 * @param {Product[]} action.products
 * @param {number} action.count
 * @returns 
 */
function reducer(state, action) {
    switch (action.type) {
        case 'add_product': {
            return [...state, action.product];
        }
        case 'remove_product': {
            const id = action.product.getId;
            return state.filter((prod) => prod.getId !== id);
        }
        case 'update_product': {
            const id = action.product.getId;
            const count = action.count;
            const index = state.findIndex((prod) => prod.getId === id);
            if (index !== -1) {
                const product = state[index];
                product.setCount = product.getCount + count;
                return [
                    ...state.slice(0, index),
                    product,
                    ...state.slice(index + 1),
                ];
            }
            return state;
        }
        case 'restore_products': {
            return [ ...action.products ];
        }
        default: {
            console.warn('Unexpected token');
        }
    }
}

function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(reducer, []);

    function handleAddProduct(prod) {
        dispatch({
            type: 'add_product',
            product: prod,
        });
        LocalStorage.saveShoppingCart('add', prod);
    }

    function handleRemoveProduct(prod) {
        dispatch({
            type: 'remove_product',
            product: prod
        });
        LocalStorage.saveShoppingCart('remove', prod);
    }

    function handleUpdateProduct(prod, count) {
        dispatch({
            type: 'update_product',
            product: prod,
            count: count,
        });
        const newProd = prod.clone();
        newProd.setCount = newProd.getCount + count;
        LocalStorage.saveShoppingCart('update', newProd);
    }

    function handleRestoreProducts(prods) {
        dispatch({
            type: 'restore_products',
            products: prods
        });
    }

    return (
        <CartContext.Provider value={{ cart, handleAddProduct, handleRemoveProduct, handleUpdateProduct, handleRestoreProducts }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;