export default class ProductPrices {
    #supermarketName;
    #weigth;
    #unitPricesArray;
    #pricesArray;
    #discountedPrices;

    /**
     * 
     * @param {string} supermarketName 
     * @param {number} weigth 
     * @param {number[]} unitPricesArray 
     * @param {number[]} pricesArray 
     * @param {number[]} discountedPrices 
     */
    constructor(supermarketName, weigth, unitPricesArray, pricesArray, discountedPrices) {
        this.#supermarketName = supermarketName || '';
        this.#weigth = weigth || 1;
        this.#unitPricesArray = unitPricesArray || [];
        this.#pricesArray = pricesArray || [];
        this.#discountedPrices = discountedPrices || [];
    }

    get getSupermarketName() {
        return this.#supermarketName;
    }

    get getWeigth() {
        return this.#weigth;
    }
    get getUnitPricesArray() {
        return this.#unitPricesArray;
    }
    get getPricesArray() {
        return this.#pricesArray;
    }
    get getDiscountedPrices() {
        return this.#discountedPrices;
    }

    set setSupermarketName(supermarketName) {
        this.#supermarketName = supermarketName;
    }

    set setWeigth(weigth) {
        this.#weigth = weigth;
    }

    set setUnitPricesArray(unitPricesArray) {
        this.#unitPricesArray = unitPricesArray;
    }

    set setPricesArray(pricesArray) {
        this.#pricesArray = pricesArray;
    }

    set setDiscountedPrices(discountedPrices) {
        this.#discountedPrices = discountedPrices;
    }

    getProperties() {
        return {
            supermarketName: this.#supermarketName, 
            weigth: this.#weigth,
            unitPricesArray: this.#unitPricesArray,
            pricesArray: this.#pricesArray,
            discountedPrices: this.#discountedPrices,
        }
    }

    static createInstance(obj) {
        const pp = new ProductPrices();
        const ppLiteral = pp.getProperties();
        try {
            for (const [ key, value ] of Object.entries(obj)) {
                if (key in ppLiteral) {
                    const setter = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
                    pp[setter] = value;
                } else {
                    throw new Error('Missing / Different property');
                }
            }
        } catch (error) {
            return null;
        }
        return pp;
    }

    getMinMax() {
        let minValue = Number.MAX_SAFE_INTEGER;
        let maxValue = Number.MIN_SAFE_INTEGER;
        const len = this.#unitPricesArray.length;
        for (let i = 0; i < len; i++) {
            const el1 = this.#unitPricesArray[i];
            const el2 = this.#pricesArray[i];
            minValue = Math.min(minValue, el1, el2);
            maxValue = Math.max(maxValue, el1, el2);
        }
        minValue = Math.max(0, Math.floor(minValue));
        maxValue = Math.ceil(maxValue);
        return { minValue, maxValue };
    }

    #getDiscountOccurrences() {
        return this.#discountedPrices.reduce((acc, isDiscounted) => {
            return acc + isDiscounted;
        }, 0);
    }

    #getAVG(arrayToAVG, occ) {
        return arrayToAVG.reduce((acc, price, index) => {
            if (!this.#discountedPrices[index]) {
                return acc + price
            }
            return acc + 0;
        }, 0) / (arrayToAVG.length - occ);
    }
    
    getAVGs() {
        const occ = this.#getDiscountOccurrences();
        const unitPricesAVG = this.#getAVG(this.#unitPricesArray, occ);
        const pricesAVG = this.#getAVG(this.#pricesArray, occ);
        return { unitPricesAVG, pricesAVG };
    }

    getLatestPrice() {
        return this.#pricesArray[this.#pricesArray.length - 1];
    }

    getLatestUnitPrice() {
        return this.#unitPricesArray[this.#unitPricesArray.length - 1];
    }

    isNowDiscounted() {
        return this.#discountedPrices[this.#discountedPrices.length - 1] === 1 ? true : false;
    }
    getLatestReport() {
        return {
            supermarketName: this.getSupermarketName,
            weigth: this.getWeigth,
            lastUnitPrice: this.getLatestUnitPrice(),
            lastPrice: this.getLatestPrice(),
            nowDiscounted: this.isNowDiscounted(),
        };
    }

}