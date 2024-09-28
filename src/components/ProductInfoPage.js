import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import '../styles/productInfoPage.css'
import ProductDiscountInfo from './ProductDiscountInfo';
import { createTestDataWithPrices } from "../utils/generatePropData";
import { PiShoppingCartThin } from 'react-icons/pi'
import { CartContext } from "./CartProvider";
import { SelectedProductContext } from "./SelectedProductProvider";
import Product from "../model/Product";

function ProductInfoPage() {
    const { cart, handleAddProduct } = useContext(CartContext);
    const { selectedProduct, setSelectedProduct } = useContext(SelectedProductContext);
    const location = useLocation();
    /**
     * @type {Product}
     */
    const product = location.state?.product;

    useEffect(() => {
        console.log('Use Effect - Checking Product');
        if (!product || !(product instanceof Product)) {
            console.log('primo if');
            if (selectedProduct && selectedProduct instanceof Product) {
                console.log('secondo if');
                //productRef.current = selectedProduct;
            } else {
                console.log('secondo else', selectedProduct, selectedProduct instanceof Product);
                setSelectedProduct(undefined);
            }
        } else {
            console.log('primo else');
            product.setPrices = createTestDataWithPrices(3);
            setSelectedProduct(product);
        }
    }, [setSelectedProduct]);

    function handleAddProductToCart(selectedProduct) {
        const check = cart.findIndex((prod) => prod.getId === selectedProduct.getId);
        if (check === -1)
            handleAddProduct(selectedProduct);
        else
            console.log('Prodotto già presente nel carrello');
    }

    if (!selectedProduct || !selectedProduct.getName) {
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
                    <h1>{selectedProduct.getName}</h1>
                    <p>{selectedProduct.getDescription}</p>
                    <div className="add-cart">
                        <button className="add-cart-button" onClick={() => handleAddProductToCart(selectedProduct)}>
                            <div className="add-cart-button-content">
                                <p className="add-cart-button-text">Aggiungi</p>
                                <PiShoppingCartThin className="add-cart-button-icon" /> 
                            </div>
                        </button>
                    </div>
                </div>
                <ProductDiscountInfo product={selectedProduct.getPrices} />
            </div>
        </main>
    );
}

export default ProductInfoPage;