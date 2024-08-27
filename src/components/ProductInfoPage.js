import { useState } from 'react';
import '../styles/productInfoPage.css'

import { useLocation } from "react-router-dom";

function ProductDiscountInfo({ product }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabClick = (index) => {
        setActiveTabIndex(index);
    };

    const tabs = ['Tab1', 'Tab2', 'Tab3'];
    const tabContent = ['Content for tab 1', 'Content for tab 2', 'Content for tab 3'];


    return (
        <div className="product-discount-info">
            <div className="tab-container">
                <ul className="tabs">
                    {tabs.map((tab, index) => (
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
                    {tabContent.map((content, index) => (
                        <div
                            key={index}
                            className={`tab-pane ${index === activeTabIndex ? 'active' : ''}`}
                        >
                            {content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ProductInfoPage() {
    const location = useLocation();
    const product = location.state?.product;

    if (!product) {
        return (
            <main>
                <div>
                    <h1>Informazioni prodotto mancanti</h1>
                </div>
            </main>
        );
    }

    const { name, description, testProdImg } = product;

    return (
        <main>
            <div className="product-info-page">
                <div className="product-image">
                    <img src={testProdImg} alt='Product' className='product-picture' />
                </div>
                <div className="product-info">
                    <h1>{name}</h1>
                    <p>{description}</p>
                    <ProductDiscountInfo product={product} />
                </div>
            </div>
        </main>
    );
}

export default ProductInfoPage;