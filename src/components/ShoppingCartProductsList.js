import { useContext } from "react";

import { CartContext } from "./CartProvider";
import ProductListItem from "./ProductListItem";

function ShoppingCartProductsList({ handleProductDeletion, handleShoppingCartDeletion }) {
    const { cart } = useContext(CartContext);

    return (
        <section className="shopping-cart-section">
            <h1>Prodotti selezionati</h1>
            <ul className="product-list">
                {cart.map((prod) => <ProductListItem type={1} prod={prod} handleProductDeletion={handleProductDeletion} />)}
            </ul>
            <div className="shopping-cart-info-container">
                <p className="product-list-item-p">* I prezzi in sconto sono segnalati in arancione</p>
                <div className="shopping-cart-deletion-container">
                    <button className="shopping-cart-deletion-button" onClick={handleShoppingCartDeletion}>Svuota carrello</button>
                </div>
            </div>
        </section>
    );
}

export default ShoppingCartProductsList;