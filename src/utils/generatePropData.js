import ProductPrices from "../model/ProductPrices";

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

/**
     * Create fake data to test the UI
     * It returns an array of ProductPrices.
     * @param {number} numberOfSupermarkets - number of supermarket for which the 
     * products have to be created
     * @returns {ProductPrices[]}
     */
function createTestDataWithPrices(numberOfSupermarkets) {
    const productPrices = [];
    const numberOfElements = randomValue(10, 1);
    const weight = generateWeight();
    for (let i = 0; i < numberOfSupermarkets; i++) {
        const unitPrices = [];
        const prices = [];
        const discountedPrices = [];
        const supermarketName = `Supermercato ${i + 1}`;
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
            const discountProbability = Math.random();
            const isDiscounted = discountProbability >= 0.8 ? 1 : 0;
            discountedPrices.push(isDiscounted);
            unitPrices.push(originalPrice);
            prices.push(price);
        }
        const pricesObject = new ProductPrices(supermarketName, weight, unitPrices, prices, discountedPrices);
        productPrices.push(pricesObject);
    }
    return productPrices;
}

export { createTestDataWithPrices };