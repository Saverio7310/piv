import { createContext, useState } from "react";

import SessionStorage from "../model/SessionStorage";

export const SelectedProductContext = createContext();

function SelectedProductProvider({ children }) {
    const [selectedProduct, setSelectedProduct] = useState(null)

    function handleAddSelectedProduct(product) {
        setSelectedProduct(product);
        SessionStorage.saveSelectedProduct(product);
    }

    return (
        <SelectedProductContext.Provider value={{ selectedProduct, handleAddSelectedProduct }}>
            {children}
        </SelectedProductContext.Provider>
    );
}

export default SelectedProductProvider;