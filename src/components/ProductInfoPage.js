import { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";

import '../styles/productInfoPage.css'
import ProductDiscountInfo from './ProductDiscountInfo';
import { createTestDataWithPrices } from "../utils/generatePropData";
import { PiShoppingCartThin } from 'react-icons/pi'
import { CartContext } from "./CartProvider";
import Product from "../model/Product";

function ProductInfoPage() {
    const { handleAddProduct } = useContext(CartContext);
    const location = useLocation();
    /**
     * @type {Product}
     */
    const product = location.state?.product;

    product.setPrices = useMemo(() => {
        return createTestDataWithPrices(3);
    }, []);

    if (!product) {
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
                    <img src={product.getImage} alt='Product' className='product-picture' />
                </div>
                <div className="product-info">
                    <h1>{product.getName}</h1>
                    <p>{product.getDescription}</p>
                    <div className="add-cart">
                        <button className="add-cart-button" onClick={() => handleAddProduct(product)}>
                            <div className="add-cart-button-content">
                                <p className="add-cart-button-text">Aggiungi</p>
                                <PiShoppingCartThin className="add-cart-button-icon" /> 
                            </div>
                        </button>
                    </div>
                </div>
                <ProductDiscountInfo product={product.getPrices} />
            </div>
        </main>
    );
}

export default ProductInfoPage;