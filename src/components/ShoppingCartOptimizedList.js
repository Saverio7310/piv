import { useContext } from "react";

import { CartContext } from "./CartProvider";
import ProductListItem from "./ProductListItem";

function ShoppingCartOptimizedList({ supermarketName, products, handleProductCountChange }) {
    const { cart } = useContext(CartContext);
    return (
        <section className="shopping-cart-section" key={`supermarket-section-${supermarketName}`}>
            <h1>{supermarketName}</h1>
            <ul className="product-list">
                {products.map(({ productID, minPrice, isDiscounted }) => {
                    const prod = cart.find((product) => product.getId === productID);
                    return (
                        <ProductListItem type={0} prod={prod} minPrice={minPrice} isDiscounted={isDiscounted} handleProductCountChange={handleProductCountChange} />
                    );
                })}
            </ul>
        </section>
    );
}

export default ShoppingCartOptimizedList;