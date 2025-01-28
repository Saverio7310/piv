import ProductPrices from "./ProductPrices.js";

export default class Product {
    /**
     * 
     * @param {number} id 
     * @param {string} name 
     * @param {string} description 
     * @param {string} quantityUnit 
     * @param {number} quantityValue 
     * @param {string} image  
     * @param {ProductPrices[]} prices 
     * @param {number} count 
     */
    constructor(id, name, description, quantity_unit, quantity_value, image, count, prices) {
        this.id = id || 0;
        this.name = name || '';
        this.description = description || '';
        this.quantityUnit = quantity_unit || '/';
        this.quantityValue = quantity_value || 1;
        this.image = image || '';
        this.count = count || 1;
        this.prices = prices || [];
    }

    get getId() {
        return this.id;
    };

    get getName() {
        return this.name;
    };

    get getDescription() {
        return this.description;
    };

    get getQuantityUnit() {
        return this.quantityUnit;
    };

    get getQuantityValue() {
        return this.quantityValue;
    };

    get getPrices() {
        return this.prices;
    };

    get getImage() {
        return this.image;
    };

    get getCount() {
        return this.count;
    }

    set setId(id) {
        this.id = id;
    };
    
    set setName(name) {
        this.name = name;
    };

    set setDescription(desc) {
        this.description = desc;
    };

    set setQuantityUnit(unit) {
        this.quantityUnit = unit;
    };

    set setQuantityValue(value) {
        this.quantityValue = value;
    };

    set setPrices(prices) {
        this.prices = prices;
    };

    set setImage(image) {
        this.image = image;
    };

    set setCount(count) {
        this.count = count;
    }

    addPrice(price) {
        this.prices.push(price);
    }

    addProperty(key, value) {
        console.log('Product - Add Property', key, value);
        if (key !== 'prices') {
            const newKey = `set${key.at(0).toUpperCase()}${key.slice(1)}`;
            this[newKey] = value;
        } else {
            const pricesList = value.map(price => ProductPrices.createInstance(price));
            this.setPrices = pricesList;
        }
    }

    clone() {
        return new Product(
            this.getId, 
            this.getName, 
            this.getDescription, 
            this.getQuantityUnit,
            this.quantityValue,
            this.getImage, 
            this.getCount,
            this.getPrices,
        );
    }

    printProduct() {
        return `Prod: ${this.name}, ${this.description}, ${this.id}, ${this.count}, ${this.image}, ${this.prices}`;
    }

    static createInstance(obj) {
        const product = new Product();
        try {
            for (const [key, value] of Object.entries(obj)) {
                product.addProperty(key, value);
            }
            return product;
        } catch (error) {
            console.error('Parsing error', error);
        }
        return product;
    }
}