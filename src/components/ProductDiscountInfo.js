import { useState } from "react";

import ProductPriceInfo from "./ProductPriceInfo";
import ProductPricesChart from "./ProductPricesChart";

import '../styles/ProductDiscountInfo.css';

function ProductDiscountInfo({ product }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const productPrices = product.getPrices;

    console.log('Product Discount Info', productPrices);

    const handleTabClick = (index) => {
        setActiveTabIndex(index);
    };

    return (
        <div className="product-discount-info">
            <div className="tab-container">
                <ul className="tabs">
                    {productPrices.map((productPrice, index) => (
                        <li
                            key={index}
                            className={`tab ${index === activeTabIndex ? 'active' : ''}`}
                            onClick={() => handleTabClick(index)}
                        >
                            {productPrice.getSupermarketName}
                        </li>
                    ))}
                </ul>
                <div className="tab-content">
                    {productPrices.map((productPrice, index) => (
                        <div
                            key={index}
                            className={`tab-pane ${index === activeTabIndex ? 'active' : ''}`}
                        >
                            <ProductPricesChart productPrice={productPrice} />
                            <ProductPriceInfo productPrice={productPrice} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductDiscountInfo;