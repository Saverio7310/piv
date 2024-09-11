import { useState } from "react";

import ProductPricesChart from "./ProductPricesChart";
import ProductPriceInfo from "./ProductPriceInfo";

function ProductDiscountInfo({ productPrices }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabClick = (index) => {
        setActiveTabIndex(index);
    };

    const tabs = ['Tab1', 'Tab2', 'Tab3', 'Tab4', 'Tab5', 'Tab6', 'Tab7', 'Tab8', 'Tab9', 'Tab10'];
    const tabContent = [
        'Content for tab 1', 'Content for tab 2', 'Content for tab 3', 'Content for tab 4', 'Content for tab 5',
        'Content for tab 6', 'Content for tab 7', 'Content for tab 8', 'Content for tab 9', 'Content for tab 10',
    ];

    const tabsToShow = tabs.slice(0, productPrices.length);

    console.log('Arrays length', tabsToShow.length, productPrices.length);

    return (
        <div className="product-discount-info">
            <div className="tab-container">
                <ul className="tabs">
                    {tabsToShow.map((tab, index) => (
                        <li
                            key={index}
                            className={`tab ${index === activeTabIndex ? 'active' : ''}`}
                            onClick={() => handleTabClick(index)}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
                <div className="tab-content">
                    {productPrices.map((priceArray, index) => (
                        <div
                            key={index}
                            className={`tab-pane ${index === activeTabIndex ? 'active' : ''}`}
                        >
                            <ProductPricesChart prices={priceArray} />
                            <ProductPriceInfo prices={priceArray} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductDiscountInfo;