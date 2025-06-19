import { describe } from "mocha";
import assert from "assert";
import ProductPrices from "../../src/model/ProductPrices";


describe('Product Prices tests', function () {
    it('should copy the Product object by value', function () {
        const productPrice = new ProductPrices('supermarket1', 1, [1,2,3], [1,2,3], [1,2,3], [1,2,3], [Date.now()]);

        const copy = ProductPrices.create(productPrice);

        assert.ok(!(productPrice === copy), 'Different reference check');
        assert.deepEqual({ ...productPrice }, { ...copy }, 'Same values check');
        assert.ok(productPrice instanceof ProductPrices, 'Product Prices object instance of Product Prices class');
        assert.ok(copy instanceof ProductPrices, 'Copy object instace of Product class');
    });
});