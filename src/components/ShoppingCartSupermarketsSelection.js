import { useContext } from "react";
import { CartContext } from "./CartProvider";

function ShoppingCartSupermarketsSelection({ children, handleCheckboxChange, handleShoppingCartOptimization }) {

    const { cart } = useContext(CartContext);

    const supermarketSet = new Set();

    cart.forEach(product => {
        product.getPrices.forEach(price => {
            supermarketSet.add(price.getSupermarketName);
        });
    });

    const supermarkets = [...supermarketSet];

    return (
        <section className="shopping-cart-section">
            <h1>Ottimizzazione spesa</h1>
            <section className="shopping-cart-section">
                <h1>Seleziona i supermercati desiderati</h1>
                <div className="product-list-item">
                    <div className="product-list-item-content gap">
                        {supermarkets.map((supermarket, index) => {
                            return (
                                <div key={`supermarkets-selection-${index}`} className="container">
                                    <label htmlFor={`supermarket-input-${index}`} className="center-content supermarket-input-label stack">{supermarket}</label>
                                    <input
                                        id={`supermarket-input-${index}`}
                                        type="checkbox"
                                        className="supermarket-input-checkbox stack"
                                        value={supermarket}
                                        onChange={(e) => handleCheckboxChange(e.target.value, e.target.checked)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="center-content inner-spacing">
                        <button className="optimize-shopping-list-btn primary-button" onClick={handleShoppingCartOptimization}>Ottimizza</button>
                    </div>
                </div>
            </section>
            {children}
        </section>
    );
}

export default ShoppingCartSupermarketsSelection;