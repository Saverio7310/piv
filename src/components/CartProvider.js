import { createContext, useReducer } from "react";

export const CartContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'add_product': {
            console.log('State', state);
            return [...state, { ...action.product, count: 1 }];
        }
        case 'remove_product': {
            const id = action.product.id;
            return state.filter((prod) => prod.id !== id);
        }
        case 'update_product': {
            const id = action.product.id;
            const index = state.findIndex((prod) => prod.id === id);
            if (index !== -1) {
                return [
                    ...state.slice(0, index),
                    { ...state[index], count: action.count },
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

    function handleRemoveProduct(prod) {
        dispatch({
            type: 'remove_product',
            product: prod
        });
    }

    function handleUpdateProduct(prod, count) {
        dispatch({
            type: 'update_product',
            product: { ...prod, count: count },
        });
    }

    return (
        <CartContext.Provider value={{ cart, handleAddProduct, handleRemoveProduct, handleUpdateProduct }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;