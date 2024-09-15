import { useContext } from "react";
import { CartContext } from "./CartProvider";

import '../styles/shoppingCart.css'

function ShoppingCart() {
    const { cart } = useContext(CartContext);
    if (cart.length === 0) {
        return (
            <main>
                <h1>Nessun prodotto nel carrello!</h1>
            </main>
        );
    }
    return (
        <main>
            <section className="shopping-cart-section">
                <h1>Prodotti selezionati</h1>
                <ul style={{ margin: '10px', listStyle: 'none', padding: 0 }}>
                    {cart.map((prod) => {
                        return (
                            <li key={prod.getId} className="product-list-item">
                                <div className="product-list-item-content">
                                    <div className="product-list-item-element product-list-item-image">
                                        <img src={prod.getImage} alt="Product" style={{ widows: '5rem', height: '5rem' }} />
                                    </div>
                                    <div className="product-list-item-element product-list-item-name">
                                        <h1 className="product-list-item-h1">{prod.getName}</h1>
                                    </div>
                                    <div className="product-list-item-element product-list-item-quantity">
                                        <p className="product-list-item-p">Quantità {prod.getCount}</p>
                                    </div>
                                    <div className="product-list-item-element product-list-item-prices">
                                        {prod.getPrices.map((price, index) => {
                                            const { supermarketName, weight, lastUnitPrice, lastPrice, nowDiscounted } = price.getLatestReport();
                                            return (
                                                <h1 key={index} className="product-list-item-h1">€{lastPrice.toFixed(2)}</h1>
                                            );
                                        })}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>
            <section className="shopping-cart-section">
                <h1>Ottimizzazione spesa</h1>
                <section>
                    <h1>Seleziona i supermercati desiderati</h1>
                    <div>
                        <div>
                            <h2></h2>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    );
}

export default ShoppingCart;