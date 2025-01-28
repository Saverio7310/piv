export default class ProductPrices {
    /**
     * 
     * @param {string} supermarketName 
     * @param {number} weigth 
     * @param {number[]} unitPrices 
     * @param {number[]} prices 
     * @param {number[]} discountedPrices 
     * @param {number[]} discountedUnitPrices
     * @param {string[]} dates
     */
    constructor(supermarketName, weigth, unitPrices, prices, discountedPrices, discountedUnitPrices, dates) {
        this.supermarketName = supermarketName || '';
        this.weigth = weigth || 1;
        this.unitPrices = unitPrices || [];
        this.prices = prices || [];
        this.discountedPrices = discountedPrices || [];
        this.discountedUnitPrices = discountedUnitPrices || [];
        this.dates = dates || [];
    }

    get getSupermarketName() {
        return this.supermarketName;
    }

    get getWeigth() {
        return this.weigth;
    }
    get getUnitPrices() {
        return this.unitPrices;
    }
    get getPrices() {
        return this.prices;
    }
    get getDiscountedPrices() {
        return this.discountedPrices;
    }

    get getDiscountedUnitPrices() {
        return this.discountedUnitPrices;
    }

    get getDates() {
        return this.dates;
    }

    set setSupermarketName(supermarketName) {
        this.supermarketName = supermarketName;
    }

    set setWeigth(weigth) {
        this.weigth = weigth;
    }

    set setUnitPrices(unitPrices) {
        this.unitPrices = unitPrices;
    }

    set setPrices(prices) {
        this.prices = prices;
    }

    set setDiscountedPrices(discountedPrices) {
        this.discountedPrices = discountedPrices;
    }

    set setDiscountedUnitPrices(discountedUnitPrices) {
        this.discountedUnitPrices = discountedUnitPrices;
    }

    set setDates(dates){
        this.dates = dates;
    }

    addPrice(price) {
        this.prices.push(price);
    }

    addDiscountedPrice(price) {
        this.discountedPrices.push(price);
    }

    addUnitPrice(price) {
        this.unitPrices.push(price);
    }

    addDiscountedUnitPrice(price) {
        this.discountedUnitPrices.push(price);
    }

    addDate(date) {
        this.dates.push(date);
    }

    getMinMax() {
        let minValue = Number.MAX_SAFE_INTEGER;
        let maxValue = Number.MIN_SAFE_INTEGER;
        const len = this.unitPrices.length;
        for (let i = 0; i < len; i++) {
            const el1 = this.unitPrices[i];
            const el2 = this.prices[i];
            minValue = Math.min(minValue, el1, el2);
            maxValue = Math.max(maxValue, el1, el2);
        }
        minValue = Math.max(0, Math.floor(minValue));
        maxValue = Math.ceil(maxValue);
        return { minValue, maxValue };
    }

    #getAVG(arrayToAVG, occ) {
        return arrayToAVG.reduce((acc, price) => {
            return acc + price
        }, 0) / (arrayToAVG.length);
    }
    
    getAVGs() {
        const unitPricesAVG = this.#getAVG(this.unitPrices);
        const pricesAVG = this.#getAVG(this.prices);
        return { unitPricesAVG, pricesAVG };
    }

    getLatestPrice(nowDiscounted) {
        if (nowDiscounted)
            return this.discountedPrices[this.prices.length - 1];
        return this.prices[this.prices.length - 1];
    }

    getLatestUnitPrice(nowDiscounted) {
        if (nowDiscounted)
            return this.discountedUnitPrices[this.prices.length - 1];
        return this.unitPrices[this.unitPrices.length - 1];
    }

    isNowDiscounted() {
        return this.discountedPrices[this.discountedPrices.length - 1] !== -1 ? true : false;
    }
    getLatestReport() {
        const nowDiscounted = this.isNowDiscounted();
        return {
            nowDiscounted,
            lastUnitPrice: this.getLatestUnitPrice(nowDiscounted),
            lastPrice: this.getLatestPrice(nowDiscounted),
        };
    }
    addProperty(key, value) {
        const newKey = `set${key.at(0).toUpperCase()}${key.slice(1)}`;
        this[newKey] = value;
    }
    static createInstance(obj) {
        const prices = new ProductPrices();
        try {
            for (const [key, value] of Object.entries(obj)) {
                prices.addProperty(key, value);
            }
            return prices;
        } catch (error) {
            console.error('Parsing error', error);
        }
        return prices;
    }
}