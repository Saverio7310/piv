import { useLocation } from "react-router-dom";

import '../styles/productInfoPage.css'
import ProductDiscountInfo from './ProductDiscountInfo';
import { createTestDataWithPrices } from "../utils/generatePropData";
import { PiShoppingCartThin } from 'react-icons/pi'

function ProductInfoPage() {
    const location = useLocation();
    const product = location.state?.product;

    const productPrices = createTestDataWithPrices(3);
    console.log('Products', productPrices);

    if (!product) {
        return (
            <main>
                <div>
                    <h1>Informazioni prodotto mancanti</h1>
                </div>
            </main>
        );
    }

    const { title, body, userId, id, testProdImg } = product;

    return (
        <main>
            <div className="product-info-page">
                <div className="product-image">
                    <img src={testProdImg} alt='Product' className='product-picture' />
                </div>
                <div className="product-info">
                    <h1>{title}</h1>
                    <p>{body}</p>
                    {/* <p>Peso: {productPrices[0].weight}</p> */}
                    <div className="add-cart">
                        <button className="add-cart-button">
                            <div className="add-cart-button-content">
                                <p className="add-cart-button-text">Aggiungi</p>
                                <PiShoppingCartThin className="add-cart-button-icon" /> 
                            </div>
                        </button>
                    </div>
                </div>
                <ProductDiscountInfo product={product} productPrices={productPrices} />
            </div>
        </main>
    );
}

export default ProductInfoPage;