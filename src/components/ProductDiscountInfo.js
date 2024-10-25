import { useState } from "react";

import ProductPriceInfo from "./ProductPriceInfo";
import ProductPricesChart from "./ProductPricesChart";

import '../styles/ProductDiscountInfo.css';

function ProductDiscountInfo({ product }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabClick = (index) => {
        setActiveTabIndex(index);
    };

    return (
        <div className="product-discount-info">
            <div className="tab-container">
                <ul className="tabs">
                    {product.map((prod, index) => (
                        <li
                            key={index}
                            className={`tab ${index === activeTabIndex ? 'active' : ''}`}
                            onClick={() => handleTabClick(index)}
                        >
                            {prod.getSupermarketName}
                        </li>
                    ))}
                </ul>
                <div className="tab-content">
                    {product.map((prod, index) => (
                        <div
                            key={index}
                            className={`tab-pane ${index === activeTabIndex ? 'active' : ''}`}
                        >
                            <ProductPricesChart prices={prod} />
                            <ProductPriceInfo prices={prod} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductDiscountInfo;