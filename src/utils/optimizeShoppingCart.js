/**
     * Returns a Set containing the selected supermarkets among the available ones
     * @param {Object[]} selectedSupermarkets - Supermarkets array
     * @param {string} selectedSupermarkets.key - Supermarket's name
     * @param {boolean} selectedSupermarkets.value - Boolean value that points out the 
     * selection of the user: true if it's been selected, false otherwise
     * @returns {Set<string>}
     */
function filterSelectedSupermarkets(selectedSupermarkets) {
    return new Set(
        selectedSupermarkets
            .filter(({ _, value }) => value === true)
            .map(({ key, _ }) => key)
    );
}

/**
 * Returns, for the selected product, an object that contains the smallest price, its 
 * related supermarket and whether it's actually discounted or not
 * @param {Product} product - Poduct to check
 * @param {Set<string>} supermarketsSet - Set of selected supermarkets
 * @returns {Object} 
 */
function findMinimumPriceForProduct(product, supermarketsSet) {
    const productID = product.getId;
    let supermarket = '';
    let minPrice = Number.MAX_SAFE_INTEGER;
    let isDiscounted = false;
    product.getPrices.forEach((price) => {
        if (supermarketsSet.has(price.getSupermarketName)) {
            const isNowDiscounted = price.isNowDiscounted()
            const latestPrice = price.getLatestPrice(isNowDiscounted);
            if (latestPrice < minPrice) {
                supermarket = price.getSupermarketName;
                minPrice = latestPrice;
                isDiscounted = isNowDiscounted;
            }
        }
    });
    return { productID, supermarket, minPrice, isDiscounted };
}

/**
 * Returns an array of objects. Each object contains the supermarket name and an
 * array containig all the products that have the smallest price
 * @param {Set<string>} supermarketsSet - Set of selected supermarkets
 * @param {Object[]} product_supermarket_array - Array of products' info
 * @returns {Object[]}
 */
function findProductsBySupermarket(supermarketsSet, product_supermarket_array) {
    const finalArray = [];
    for (const supermarket of supermarketsSet.values()) {
        const arr = product_supermarket_array.filter((sup) => sup.supermarket === supermarket);
        if (arr.length === 0)
            continue;
        const obj = {
            supermarketName: supermarket,
            products: arr,
        };
        finalArray.push(obj);
    }

    finalArray.sort((a, b) => a.supermarketName.localeCompare(b.supermarketName));

    return finalArray;
}

export default function shoppingCartOptimization(selectedSupermarkets, cart) {
    const supermarketsSet = filterSelectedSupermarkets(selectedSupermarkets);

    const product_supermarket_array = cart.map((product) => {
        return findMinimumPriceForProduct(product, supermarketsSet);
    });

    return findProductsBySupermarket(supermarketsSet, product_supermarket_array);
}