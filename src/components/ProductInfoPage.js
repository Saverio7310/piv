import { useLocation } from "react-router-dom";

import '../styles/productInfoPage.css'
import ProductDiscountInfo from './ProductDiscountInfo';

function ProductInfoPage() {
    const location = useLocation();
    const product = location.state?.product;

    function randomValue(order, minimum, digits) {
        const ranVal = Math.random() * order;
        if (digits) {
            return parseFloat((ranVal + minimum).toFixed(2));
        }
        return Math.floor(ranVal) + minimum;
    }

    function generateWeight() {
        const weight = Math.round(randomValue(20, 0))/10;
        if (weight === 0)
            return 0.1;
        return weight;
    }

    function createTestData(numberOfSupermarkets) {
        const testData = [];
        const numberOfElements = randomValue(10, 1);
        const weight = generateWeight();
        for (let i = 0; i < numberOfSupermarkets; i++) {
            const productPriceData = {};
            const unitPricesArray = [];
            const pricesArray = [];
            for (let j = 0; j < numberOfElements; j++) {
                let originalPrice = randomValue(10, 1);
                let price = 0;
                const changingAmount = randomValue(1, 0, 2);
                if (j % 2 === 0) {
                    originalPrice = originalPrice + changingAmount;
                } else {
                    originalPrice = originalPrice - changingAmount;
                }
                price = originalPrice * weight;
                unitPricesArray.push(originalPrice);
                pricesArray.push(price)
            }
            productPriceData.weight = weight;
            productPriceData.unitPricesArray = unitPricesArray;
            productPriceData.pricesArray = pricesArray;
            testData.push(productPriceData);
        }
        return testData;
    }

    const productPrices = createTestData(3);
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
                    <p>Peso: {productPrices[0].weight}</p>
                    <ProductDiscountInfo product={product} productPrices={productPrices} />
                </div>
            </div>
        </main>
    );
}

export default ProductInfoPage;