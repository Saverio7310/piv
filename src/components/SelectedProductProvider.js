import { createContext, useState } from "react";

export const SelectedProductContext = createContext();

function SelectedProductProvider({children}) {
    const [selectedProduct, setSelectedProduct] = useState(null)
    return (
        <SelectedProductContext.Provider value={{selectedProduct, setSelectedProduct}}>
            {children}
        </SelectedProductContext.Provider>
    );
}

export default SelectedProductProvider;