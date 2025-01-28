import { useContext, useEffect } from "react";
import { PiShoppingCartThin } from 'react-icons/pi';

import { CartContext } from "./CartProvider";
import { ToastContext } from "./ToastProvider";
import ProductDiscountInfo from './ProductDiscountInfo';
import { SelectedProductContext } from "./SelectedProductProvider";

import SessionStorage from "../model/SessionStorage";

import '../styles/ProductInfoPage.css';
import ProductPrices from "../model/ProductPrices";
import printCurrentInfo from "../utils/logObject";

function ProductInfoPage() {
    const { cart, handleAddProduct } = useContext(CartContext);
    const { addToast, TYPES } = useContext(ToastContext);
    const { selectedProduct, handleAddSelectedProduct } = useContext(SelectedProductContext);

    useEffect(() => {
        console.log('Use Effect - Checking Product', printCurrentInfo(selectedProduct));
        if (selectedProduct)
            return;
        const product = SessionStorage.getSelectedProduct();
        console.log('Preloaded product', printCurrentInfo(product));
        handleAddSelectedProduct(product);
    }, [handleAddSelectedProduct]);

    useEffect(() => {
        console.log('Use Effect - Fetching Prices', printCurrentInfo(selectedProduct));
        if (selectedProduct && selectedProduct.getPrices.length !== 0) {
            return;
        }

        async function fetchData() {
            try {
                const product_id = selectedProduct.getId;
                const response = await fetch(`http://192.168.1.88:3030/api/v1/products/${product_id}/info`);
                const serverResponseObject = await response.json();
                const { rowCount, data } = serverResponseObject;
                console.log('Fetched data (prices)', serverResponseObject);
                const prices = new ProductPrices('Esselunga', 100);
                data.map(obj => {
                    prices.addDate(obj.created_at)
                    prices.addPrice(obj.price)
                    prices.addUnitPrice(obj.unit_price)
                    prices.addDiscountedPrice(obj.discounted_price)
                    prices.addDiscountedUnitPrice(obj.discounted_unit_price)
                });
                const p = selectedProduct.clone();
                p.addPrice(prices);
                handleAddSelectedProduct(p);
            } catch (error) {
                console.error('Error while fetching prices', error);
            }
        }
        if (selectedProduct && selectedProduct.getPrices.length === 0) {
            fetchData()
        }
    }, []);

    function handleAddProductToCart(selectedProduct) {
        const check = cart.findIndex((prod) => prod.getId === selectedProduct.getId);
        const id = Date.now();
        if (check === -1) {
            handleAddProduct(selectedProduct);
            addToast({ id: id, type: TYPES.success, message: `Prodotto aggiunto al carrello` });
        } else {
            addToast({ id: id, type: TYPES.info, message: `Prodotto già nel carrello` });
            console.log('Prodotto già presente nel carrello');
        }
    }
    console.log(`
    CHECKS:    
    SELECTED PRODUCT:`, printCurrentInfo(selectedProduct));
    if (!selectedProduct || !selectedProduct?.getName || selectedProduct.getPrices.length === 0) {
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
                    {/* <p>{selectedProduct.getDescription}</p> */}
                    <div className="add-cart">
                        <button className="add-cart-button primary-button" onClick={() => handleAddProductToCart(selectedProduct)}>
                            <div className="add-cart-button-content">
                                <p className="add-cart-button-text">Aggiungi</p>
                                <PiShoppingCartThin className="add-cart-button-icon" />
                            </div>
                        </button>
                    </div>
                </div>
                <ProductDiscountInfo product={selectedProduct} />
            </div>
        </main>
    );
}

export default ProductInfoPage;