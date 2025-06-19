import { describe } from "mocha";
import assert from "assert";
import Product from "../../src/model/Product";
import ProductPrices from "../../src/model/ProductPrices";


describe('Product creation', function () {
    it('should copy the Product from instance', function () {
        const productPrice = new ProductPrices('supermarket1', 1, [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [Date.now()]);
        const product = new Product(1, 'test', 'Copy test', 'Kg', 1, 'image', 1, [], [productPrice]);

        const copy = Product.create(product);


        assert.ok(!(product === copy), 'Different reference check');
        assert.deepEqual(JSON.parse(JSON.stringify({ ...copy })), JSON.parse(JSON.stringify({ ...product })), 'Same values check');
        assert.ok(product instanceof Product, 'Product object instance of Product class');
        assert.ok(copy instanceof Product, 'Copy object instace of Product class');
    });
    it('should copy the Product from object', function () {
        const productPrice = new ProductPrices('supermarket1', 1, [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [Date.now()]);
        const product = new Product(1, 'test', 'Copy test', 'Kg', 1, 'image', 1, [], [productPrice]);
        const reference = {
            product_id: 1,
            name: 'test',
            brand: 'Copy test',
            quantity_unit: 'Kg',
            quantity_value: 1,
            image: 'image',
            count: 1,
            prices: [productPrice]
        };

        const copy = Product.create(reference);

        assert.ok(!(product === copy), 'Different reference check');
        assert.deepEqual(JSON.parse(JSON.stringify({ ...copy })), JSON.parse(JSON.stringify({ ...product })), 'Same values check');
        assert.ok(product instanceof Product, 'Product object instance of Product class');
        assert.ok(copy instanceof Product, 'Copy object instace of Product class');
    });
    it('should copy the Product from object 2', function () {
        const productPrice = new ProductPrices('supermarket1', 1, [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [Date.now()]);
        const product = new Product(1, 'test', 'Copy test', 'Kg', 1, 'image', 1, [], [productPrice]);
        const price_reference = {
            supermarket_name: 'supermarket1',
            weight: 1,
            unit_prices: [1, 2, 3],
            prices: [1, 2, 3],
            discounted_prices: [1, 2, 3],
            discounted_unit_prices: [1, 2, 3],
            dates: [Date.now()]
        };
        const reference = {
            product_id: 1,
            name: 'test',
            brand: 'Copy test',
            quantity_unit: 'Kg',
            quantity_value: 1,
            image: 'image',
            count: 1,
            prices: [price_reference]
        };

        const copy = Product.create(reference);


        assert.ok(!(product === copy), 'Different reference check');
        assert.deepEqual(JSON.parse(JSON.stringify({ ...copy })), JSON.parse(JSON.stringify({ ...product })), 'Same values check');
        assert.ok(product instanceof Product, 'Product object instance of Product class');
        assert.ok(copy instanceof Product, 'Copy object instace of Product class');
    });
    it('should NOT copy the Product from object', function () {
        const productPrice = new ProductPrices('supermarket1', 1, [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [Date.now()]);
        const product = new Product(1, 'test', 'Copy test', 'Kg', 1, 'image', 1, [], [productPrice]);
        //different id and wrong property name: 'names' instread of 'name'
        const reference = {
            product_id: 2,
            names: 'test',
            brand: 'Copy test',
            quantity_unit: 'Kg',
            quantity_value: 1,
            image: 'image',
            count: 1,
            prices: [productPrice]
        };

        const copy = Product.create(reference);


        assert.ok(!(product === copy), 'Different reference check');
        assert.notDeepEqual(JSON.parse(JSON.stringify({ ...copy })), JSON.parse(JSON.stringify({ ...product })), 'Same values check');
        assert.ok(product instanceof Product, 'Product object instance of Product class');
        assert.ok(copy instanceof Product, 'Copy object instace of Product class');
    });
    it('should NOT copy the Product from object 2', function () {
        const productPrice = new ProductPrices('supermarket1', 1, [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [Date.now()]);
        const product = new Product(1, 'test', 'Copy test', 'Kg', 1, 'image', 1, [], [productPrice]);
        //'supermarketName' instead of 'supermarket_name' and dates is a number instead of an array
        const price_reference = {
            supermarketName: 'supermarket1',
            weight: 1,
            unit_prices: [1, 2, 3],
            prices: [1, 2, 3],
            discounted_prices: [1, 2, 3],
            discounted_unit_prices: [1, 2, 3],
            dates: Date.now()
        };
        const reference = {
            product_id: 1,
            name: 'test',
            brand: 'Copy test',
            quantity_unit: 'Kg',
            quantity_value: 1,
            image: 'image',
            count: 1,
            prices: [price_reference]
        };

        const copy = Product.create(reference);


        assert.ok(!(product === copy), 'Different reference check');
        assert.notDeepEqual(JSON.parse(JSON.stringify({ ...copy })), JSON.parse(JSON.stringify({ ...product })), 'Same values check');
        assert.ok(product instanceof Product, 'Product object instance of Product class');
        assert.ok(copy instanceof Product, 'Copy object instace of Product class');
    });
    it('should not throw an error when one or more properties are missing', function () {
        const productPrice = new ProductPrices('supermarket1', 1, [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [Date.now()]);
        const product = new Product(1, 'test', 'Copy test', 'Kg', 1, 'image', 1, [], [productPrice]);
        //wrong property name 'supermarket_name' and missing property 'dates'
        const price_reference = {
            supermarketName: 'supermarket1',
            weight: 1,
            unit_prices: [1, 2, 3],
            prices: [1, 2, 3],
            discounted_prices: [1, 2, 3],
            discounted_unit_prices: [1, 2, 3],
        };
        //missing properties 'id' and 'image', count set to null, 'quantity_value' set to undefined
        const reference = {
            name: 'test',
            brand: 'Copy test',
            quantity_unit: 'Kg',
            quantity_value: undefined,
            count: null,
            prices: [price_reference]
        };

        const copy = Product.create(reference);

        assert.ok(!(product === copy), 'Different reference check');
        assert.notDeepEqual(JSON.parse(JSON.stringify({ ...copy })), JSON.parse(JSON.stringify({ ...product })), 'Same values check');
        assert.ok(product instanceof Product, 'Product object instance of Product class');
        assert.ok(copy instanceof Product, 'Copy object instace of Product class');
    });
});