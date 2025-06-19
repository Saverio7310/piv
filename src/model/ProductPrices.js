export default class ProductPrices {
    /**
     * 
     * @param {string} supermarket_name 
     * @param {number} weigth 
     * @param {number[]} unit_prices 
     * @param {number[]} prices 
     * @param {number[]} discounted_prices 
     * @param {number[]} discounted_unit_prices
     * @param {string[]} dates
     */
    constructor(supermarket_name, weigth, unit_prices, prices, discounted_prices, discounted_unit_prices, dates) {
        this.supermarket_name = supermarket_name ?? 'supermarket';
        this.weigth = weigth ?? 1;
        this.unit_prices = unit_prices ?? [];
        this.prices = prices ?? [];
        this.discounted_prices = discounted_prices ?? [];
        this.discounted_unit_prices = discounted_unit_prices ?? [];
        this.dates = dates ?? [];
    }

    get getSupermarketName() {
        return this.supermarket_name;
    }

    get getWeigth() {
        return this.weigth;
    }
    get getUnitPrices() {
        return this.unit_prices;
    }
    get getPrices() {
        return this.prices;
    }
    get getDiscountedPrices() {
        return this.discounted_prices;
    }

    get getDiscountedUnitPrices() {
        return this.discounted_unit_prices;
    }

    get getDates() {
        return this.dates;
    }

    set setSupermarketName(supermarket_name) {
        this.supermarket_name = supermarket_name;
    }

    set setWeigth(weigth) {
        this.weigth = weigth;
    }

    set setUnitPrices(unit_prices) {
        this.unit_prices = unit_prices;
    }

    set setPrices(prices) {
        this.prices = prices;
    }

    set setDiscountedPrices(discounted_prices) {
        this.discounted_prices = discounted_prices;
    }

    set setDiscountedUnitPrices(discounted_unit_prices) {
        this.discounted_unit_prices = discounted_unit_prices;
    }

    set setDates(dates) {
        this.dates = dates;
    }

    addPrice(price) {
        this.prices.push(price);
    }

    addDiscountedPrice(price) {
        this.discounted_prices.push(price);
    }

    addUnitPrice(price) {
        this.unit_prices.push(price);
    }

    addDiscountedUnitPrice(price) {
        this.discounted_unit_prices.push(price);
    }

    addDate(date) {
        this.dates.push(date);
    }

    getMinMax() {
        let minValue = Number.MAX_SAFE_INTEGER;
        let maxValue = Number.MIN_SAFE_INTEGER;
        const len = this.unit_prices.length;
        for (let i = 0; i < len; i++) {
            const el1 = this.unit_prices[i];
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
        const unitPricesAVG = this.#getAVG(this.unit_prices);
        const pricesAVG = this.#getAVG(this.prices);
        return { unitPricesAVG, pricesAVG };
    }

    getLatestPrice(nowDiscounted) {
        if (nowDiscounted)
            return this.discounted_prices[this.prices.length - 1];
        return this.prices[this.prices.length - 1];
    }

    getLatestUnitPrice(nowDiscounted) {
        if (nowDiscounted)
            return this.discounted_unit_prices[this.prices.length - 1];
        return this.unit_prices[this.unit_prices.length - 1];
    }

    isNowDiscounted() {
        return this.discounted_prices[this.discounted_prices.length - 1] !== -1 ? true : false;
    }
    getLatestReport() {
        const nowDiscounted = this.isNowDiscounted();
        return {
            nowDiscounted,
            lastUnitPrice: this.getLatestUnitPrice(nowDiscounted),
            lastPrice: this.getLatestPrice(nowDiscounted),
        };
    }

    /**
     * Factory method that returns an instance of the class. The instance is created from the argument.
     * If the arg is a ProductPrices instance, the result is a copy. If the arg is an object containing the
     * required properties, the result is a new ProductPrices.
     * @param {ProductPrices | Object} obj 
     * @returns 
     */
    static create(obj) {
        if (obj === null || obj === undefined) return new ProductPrices();
        if (obj instanceof ProductPrices) {
            return new ProductPrices(
                obj.getSupermarketName,
                obj.getWeigth,
                obj.getUnitPrices,
                obj.getPrices,
                obj.getDiscountedPrices,
                obj.getDiscountedUnitPrices,
                obj.getDates
            );
        }
        return new ProductPrices(
            obj.supermarket_name,
            obj.weigth,
            obj.unit_prices,
            obj.prices,
            obj.discounted_prices,
            obj.discounted_unit_prices,
            obj.dates
        );
    }
}