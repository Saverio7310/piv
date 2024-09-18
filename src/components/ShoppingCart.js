import { useContext, useState } from "react";
import { CartContext } from "./CartProvider";

import '../styles/shoppingCart.css'

function ShoppingCart() {
    const { cart } = useContext(CartContext);
    const [selectedSupermarkets, setSelectedSupermarkets] = useState([]);
    const [optimizedProduct, setOptimizedProduct] = useState([]);

    const supermarkets = ['Supermercato 1', 'Supermercato 2', 'Supermercato 3'];

    function handleCheckboxChange(supermarketName, isChecked) {
        let found = false;
        const newSelectedSupermarkets = selectedSupermarkets.map(({ key, value }) => {
            if (key === supermarketName) {
                found = true;
                return { key: supermarketName, value: isChecked };
            } else {
                return { key, value };
            }
        });
        if (!found)
            newSelectedSupermarkets.push({ key: supermarketName, value: isChecked });
        setSelectedSupermarkets(newSelectedSupermarkets);
        /* setSelectedSupermarkets((prevValues) => {
            const values = [...prevValues];
            const obj = values.find(pair => pair.key === supermarketName);
            if (!obj)
                values.push({ key: supermarketName, value: isChecked });
            else
                obj.value = isChecked;
            return values;
        }) */
    }

    function handleOptimizationClick() {
        const supermarketsSet = new Set(selectedSupermarkets.reduce((acc, { key, value }) => {
            if (value)
                return [...acc, key];
            return acc;
        }, []));

        console.log('Supermarket selezionati', supermarketsSet);

        const product_supermarket_array = [];
        cart.forEach((product) => {
            const obj = {
                productID: product.getId,
                supermarket: '',
                minPrice: Number.MAX_SAFE_INTEGER,
                isDiscounted: false,
            }
            product.getPrices.forEach((price) => {
                if (supermarketsSet.has(price.getSupermarketName)) {
                    console.log('Seupermarket trovato');
                    const latestPrice = price.getLatestPrice();
                    if (latestPrice < obj.minPrice) {
                        obj.supermarket = price.getSupermarketName;
                        obj.minPrice = latestPrice;
                        obj.isDiscounted = price.isNowDiscounted();
                    }
                } else {
                    console.log('supermarket non trovato');
                }
            });
            product_supermarket_array.push(obj);
        });
        console.log('product supermarket array', product_supermarket_array);

        const finalArray = [];
        for (const supermarket of supermarketsSet.values()) {
            const arr = product_supermarket_array.filter((sup) => sup.supermarket === supermarket);
            if (arr.length === 0)
                continue;
            const obj = {
                supermarketName: supermarket,
                products: arr,
            };
            finalArray.push(obj);
        }
        setOptimizedProduct(finalArray);
        console.log('final array', finalArray);
    }

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
                <ul className="product-list">
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
                                                <h1 key={index} className={`product-list-item-h1 ${nowDiscounted ? 'discount' : ''}`}>€{lastPrice.toFixed(2)}</h1>
                                            );
                                        })}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div style={{marginLeft: '10px'}}>
                    <p className="product-list-item-p">* I prezzi in sconto sono segnalati in arancione</p>
                </div>
            </section>
            <section className="shopping-cart-section">
                <h1>Ottimizzazione spesa</h1>
                <section className="shopping-cart-section">
                    <h1>Seleziona i supermercati desiderati</h1>
                    <div className="product-list-item">
                        <div className="product-list-item-content">
                            {supermarkets.map((supermarket, index) => {
                                return (
                                    <div key={index} className="container">
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
                            <button className="main-function-button" onClick={handleOptimizationClick}>Ottimizza</button>
                        </div>
                    </div>
                </section>
                {optimizedProduct.map(({ supermarketName, products }) => {
                    return (
                        <section className="shopping-cart-section" key={supermarketName}>
                            <h1>{supermarketName}</h1>
                            <ul className="product-list">
                                {products.map(({ productID, minPrice, isDiscounted }) => {
                                    const prod = cart.find((product) => product.getId === productID);
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
                                                <div className="product-list-item-element product-list-item-name">
                                                    <h1 className={`product-list-item-h1 ${isDiscounted ? 'discount' : ''}`}>€{(prod.getCount * minPrice).toFixed(2)}</h1>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    );
                })}
            </section>
        </main>
    );
}

export default ShoppingCart;