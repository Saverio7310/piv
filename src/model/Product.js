import ProductPrices from "./ProductPrices.js";

export default class Product {
    /**
     * 
     * @param {number} product_id 
     * @param {string} name 
     * @param {string} brand 
     * @param {string} quantity_unit 
     * @param {number} quantity_value 
     * @param {string} image  
     * @param {number} count 
     * @param {any[]} supermarkets Links supermarket and related product id { supermarket, origin_id }
     * @param {ProductPrices[]} prices 
     */
    constructor(product_id, name, brand, quantity_unit, quantity_value, image, count, supermarkets, prices) {
        this.product_id = product_id ?? 0;
        this.name = name ?? 'Product';
        this.brand = brand ?? '/';
        this.quantity_unit = quantity_unit ?? '/';
        this.quantity_value = quantity_value ?? 1;
        this.image = image ?? 'no-image';
        this.count = count ?? 1;
        this.supermarkets = supermarkets ?? [];
        this.prices = prices ?? [];
    }

    get getId() {
        return this.product_id;
    };

    get getName() {
        return this.name;
    };

    get getBrand() {
        return this.brand;
    };

    get getQuantityUnit() {
        return this.quantity_unit;
    };

    get getQuantityValue() {
        return this.quantity_value;
    };

    get getSupermarkets() {
        return this.supermarkets;
    }

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
        this.product_id = id;
    };
    
    set setName(name) {
        this.name = name;
    };

    set setBrand(desc) {
        this.brand = desc;
    };

    set setQuantityUnit(unit) {
        this.quantity_unit = unit;
    };

    set setQuantityValue(value) {
        this.quantity_value = value;
    };

    set setSupermarkets(supermarkets) {
        this.supermarkets = supermarkets;
    }

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

    printProduct() {
        return JSON.stringify(this);
    }

    /**
     * Factory method that returns an instance of the class. The instance is created from the argument.
     * If the arg is a Product instance, the result is a copy. If the arg is an object containing the
     * required properties, the result is a new Product.
     * @param {Product | Object} obj 
     * @returns 
     */
    static create(obj) {
        if (obj === null || obj === undefined) return new Product();
        if (obj instanceof Product) {
            return new Product(
                obj.getId,
                obj.getName,
                obj.getBrand,
                obj.getQuantityUnit,
                obj.getQuantityValue,
                obj.getImage,
                obj.getCount,
                obj.getSupermarkets,
                obj.getPrices.map(price => ProductPrices.create(price))
            );
        }
        return new Product(
            obj.product_id,
            obj.name,
            obj.brand,
            obj.quantity_unit,
            obj.quantity_value,
            obj.image,
            obj.count,
            obj.supermarkets,
            obj.prices ? obj.prices.map(price => ProductPrices.create(price)) : []
        );
    }
}