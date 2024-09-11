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
     * It returns an array of objects. Each object has a number property (weight),
     * an array for the prices and for the unit prices
     * [
     *   {
     *     weight: number,
     *     unitPricesArray: number[],
     *     pricesArray: number[]
     *   },
     * ]
     * @param {number} numberOfSupermarkets - number of supermarket for which the 
     * products have to be created
     * @returns {Object[]}
     */
function createTestDataWithPrices(numberOfSupermarkets) {
    const testData = [];
    const numberOfElements = randomValue(10, 1);
    const weight = generateWeight();
    for (let i = 0; i < numberOfSupermarkets; i++) {
        const productPriceData = {};
        const unitPricesArray = [];
        const pricesArray = [];
        const discountedPrices = [];
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
            unitPricesArray.push(originalPrice);
            pricesArray.push(price);
        }
        productPriceData.weight = weight;
        productPriceData.unitPricesArray = unitPricesArray;
        productPriceData.pricesArray = pricesArray;
        productPriceData.discountedPrices = discountedPrices;
        testData.push(productPriceData);
    }
    return testData;
}

export { createTestDataWithPrices };