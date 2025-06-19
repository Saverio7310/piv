import { useContext } from "react";

import { CartContext } from "./CartProvider";
import ProductListItem from "./ProductListItem";

function ShoppingCartOptimizedList({ supermarketName, products, handleProductCountChange }) {
    const { cart } = useContext(CartContext);
   
    const totalPrice = (products.reduce((acc, p) => {
        const prod = cart.find((product) => product.getId === p.productID);
        return acc += p.minPrice*prod.getCount;
    }, 0)).toFixed(2);

    return (
        <section className="shopping-cart-section" key={`supermarket-section-${supermarketName}`}>
            <h1>{supermarketName}</h1>
            <ul className="product-list">
                {products.map(({ productID, minPrice, isDiscounted }) => {
                    const prod = cart.find((product) => product.getId === productID);
                    return (
                        <ProductListItem key={prod.getId} type={0} prod={prod} minPrice={minPrice} isDiscounted={isDiscounted} handleProductCountChange={handleProductCountChange} />
                    );
                })}
                <div className="product-list-item shopping-cart-bill">
                    <div className="product-list-item-element section-product-price shopping-cart-bill-dim">
                        <h1 className="total-price product-list-item-price">Tot:</h1>
                    </div>
                    <div className="product-list-item-element section-product-price shopping-cart-bill-dim">
                        <h1 className="total-price product-list-item-price">€{totalPrice}</h1>
                    </div>
                </div>
            </ul>
        </section>
    );
}

export default ShoppingCartOptimizedList;