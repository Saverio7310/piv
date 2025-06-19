import { useContext, useEffect, useState } from "react";
import { PiShoppingCartThin } from 'react-icons/pi';

import { CartContext } from "./CartProvider";
import { ToastContext } from "./ToastProvider";
import ProductDiscountInfo from './ProductDiscountInfo';
import { SelectedProductContext } from "./SelectedProductProvider";

import SessionStorage from "../model/SessionStorage";

import '../styles/ProductInfoPage.css';
import ProductPrices from "../model/ProductPrices";
import LoadingMessage from "./LoadingMessage";
import Product from "../model/Product";

function ProductInfoPage() {
    const [loading, setLoading] = useState(false);
    const { cart, handleAddProduct } = useContext(CartContext);
    const { addToast, TYPES } = useContext(ToastContext);
    const { selectedProduct, handleAddSelectedProduct } = useContext(SelectedProductContext);

    useEffect(() => {
        if (selectedProduct)
            return;
        const product = SessionStorage.getSelectedProduct();
        handleAddSelectedProduct(product);
    }, [handleAddSelectedProduct]);

    useEffect(() => {
        if (selectedProduct && selectedProduct.getPrices.length !== 0) {
            return;
        }

        async function fetchData() {
            try {
                const product_id = selectedProduct.getId;
                const URL = `${process.env.REACT_APP_API_URL}/api/v2/products/${product_id}/info`;
                const response = await fetch(URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        product_id: selectedProduct.getId,
                        supermarkets: selectedProduct.getSupermarkets

                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
                const serverResponseObject = await response.json();
                const { rowCount, data } = serverResponseObject;
                const p = Product.create(selectedProduct);
                data.map(obj => {
                    const prices = ProductPrices.create(obj);
                    p.addPrice(prices);
                });
                setLoading(false);
                handleAddSelectedProduct(p);
            } catch (error) {
                console.error('Error while fetching prices', error);
            }
        }
        if (selectedProduct && selectedProduct.getPrices.length === 0) {
            setLoading(true);
            fetchData()
        }
    }, []);

    function handleAddProductToCart(selectedProduct) {
        const check = cart.findIndex((prod) => prod.getId === selectedProduct.getId);
        if (check === -1) {
            handleAddProduct(selectedProduct);
            addToast({ type: TYPES.success, message: `Prodotto aggiunto al carrello` });
        } else {
            addToast({ type: TYPES.info, message: `Prodotto già nel carrello` });
        }
    }

    if (!selectedProduct || !selectedProduct?.getName) {
        return (
            <main>
                <div>
                    <h1>Informazioni prodotto mancanti</h1>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="product-info-page">
                <div className="product-image">
                    <img src={selectedProduct.getImage} alt='Product' className='product-picture' />
                </div>
                <div className="product-info">
                    <h1 className="product-title">
                        {selectedProduct.getName}
                        <span className="product-description">{selectedProduct.getQuantityValue} {selectedProduct.getQuantityUnit}</span>
                    </h1>
                    <div className="add-cart">
                        <button className="add-cart-button primary-button" onClick={() => handleAddProductToCart(selectedProduct)}>
                            <div className="add-cart-button-content">
                                <p className="add-cart-button-text">Aggiungi</p>
                                <PiShoppingCartThin className="add-cart-button-icon" />
                            </div>
                        </button>
                    </div>
                </div>
                {
                    loading ?
                        <LoadingMessage message={'Caricamento prezzi in corso...'} />
                        :
                        <ProductDiscountInfo product={selectedProduct} />
                }
            </div>
        </main>
    );
}

export default ProductInfoPage;