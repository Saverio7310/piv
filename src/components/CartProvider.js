import { createContext, useReducer } from "react";
import Product from "../model/Product";

export const CartContext = createContext();

/**
 * 
 * @param {Product[]} state 
 * @param {Object} action 
 * @param {string} action.type
 * @param {Product} action.product
 * @param {number} action.count
 * @returns 
 */
function reducer(state, action) {
    switch (action.type) {
        case 'add_product': {
            console.log('State', state);
            return [...state, action.product];
        }
        case 'remove_product': {
            const id = action.product;
            return state.filter((prod) => prod.getId !== id);
        }
        case 'update_product': {
            const id = action.product.getId;
            const index = state.findIndex((prod) => prod.getId === id);
            if (index !== -1) {
                return [
                    ...state.slice(0, index),
                    state[index].setCount = action.count,
                    ...state.slice(index + 1),
                ];
            }
            return state;
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
    }

    function handleRemoveProduct(prodID) {
        dispatch({
            type: 'remove_product',
            product: prodID
        });
    }

    function handleUpdateProduct(prod, count) {
        dispatch({
            type: 'update_product',
            product: prod,
            count: count,
        });
    }

    return (
        <CartContext.Provider value={{ cart, handleAddProduct, handleRemoveProduct, handleUpdateProduct }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;