import { useContext } from "react";
import { CartContext } from "./CartProvider";

import '../styles/shoppingCart.css'

function ShoppingCart() {
    const { cart } = useContext(CartContext);
    return (
        <main>
            <section className="shopping-cart-section">
                <h1>Prodotti selezionati</h1>
                <ul style={{ margin: '10px', listStyle: 'none', padding: 0 }}>
                    {cart.map((prod) => {
                        return (
                            <li key={prod.userId * prod.id} className="product-list-item">
                                <div className="product-list-item-content">
                                    <div className="product-list-item-element product-list-item-image">
                                        <img src={prod.testProdImg} alt="Product" style={{ widows: '5rem', height: '5rem' }} />
                                    </div>
                                    <div className="product-list-item-element product-list-item-name">
                                        <h1 className="product-list-item-h1">{prod.title}</h1>
                                    </div>
                                    <div className="product-list-item-element product-list-item-quantity">
                                        <p className="product-list-item-p">Quantità {prod.count}</p>
                                    </div>
                                    <div className="product-list-item-element product-list-item-prices">
                                        {prod.latestPrices.map((price, index) => {
                                            return (
                                                <h1 key={index} className="product-list-item-h1">€{price[2].toFixed(2)}</h1>
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