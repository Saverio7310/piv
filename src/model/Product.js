import ProductPrices from "./ProductPrices";

export default class Product {
    #id;
    #name;
    #description;
    #image;
    #prices;
    #count;

    /**
     * 
     * @param {number} id 
     * @param {string} name 
     * @param {string} description 
     * @param {string} image  
     * @param {ProductPrices[]} prices 
     * @param {number} count 
     */
    constructor(id, name, description, image, prices, count) {
        this.#id = id || 0;
        this.#name = name || '';
        this.#description = description || '';
        this.#image = image || '';
        this.#prices = prices || [];
        this.#count = count || 1;
    }

    get getId() {
        return this.#id;
    };

    get getName() {
        return this.#name;
    };

    get getDescription() {
        return this.#description;
    };

    get getPrices() {
        return this.#prices;
    };

    get getImage() {
        return this.#image;
    };

    get getCount() {
        return this.#count;
    }

    set setId(id) {
        this.#id = id;
    };
    
    set setName(name) {
        this.#name = name;
    };

    set setDescription(desc) {
        this.#description = desc;
    };

    set setPrices(prices) {
        this.#prices = prices;
    };

    set setImage(image) {
        this.#image = image;
    };

    set setCount(count) {
        this.#count = count;
    }

    clone() {
        return new Product(
            this.getId, 
            this.getName, 
            this.getDescription, 
            this.getImage, 
            this.getPrices,
            this.getCount,
        );
    }

    printProduct() {
        return `Prod: ${this.#name}, ${this.#description}, ${this.#id}, ${this.#count}, ${this.#image}, ${this.#prices}`;
    }

    getProperties() {
        return {
            id: this.#id,
            name: this.#name,
            description: this.#description,
            image: this.#image,
            count: this.#count,
            prices: this.#prices.length ? this.#prices.map((price) => price.getProperties()) : null,
        }
    }

    static createInstance(obj) {
        const p = new Product();
        const pLiteral = p.getProperties();
        try {
            for (const [ key, value ] of Object.entries(obj)) {
                let val = value;
                if (key in pLiteral) {
                    if (key === 'prices') {
                        val = value.map((price) => ProductPrices.createInstance(price));
                    }
                    const setter = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
                    p[setter] = val;
                } else {
                    throw new Error('Missing / Different property');
                }
            }
        } catch (error) {
            return null;
        }
        return p;
    }

    /* getPrice(key) {
        return this.#prices.get(key);
    }

    setPrice(key, value) {
        this.#prices.set(key, value);
    } */
}