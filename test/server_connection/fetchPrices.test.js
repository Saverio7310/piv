import { describe } from "mocha";
import assert from "assert";
import Product from "../../src/model/Product";
import getURI from "../../src/utils/getURI";

describe('Products fetch', function () {
    it('should fetch and manage products correctly', async function () {
        try {
            const correctURI = getURI('abbracci');
            const URL_product = `http://localhost:3030/api/v1/products2/${correctURI}?offset=${0}&limit=${10}`;
            const response_products = await fetch(URL_product);
            let serverResponseObject = await response_products.json();
            const product = Product.create(serverResponseObject.data[0]);

            const URL_prices = `http://localhost:3030/api/v1/products/${product.getId}/info`;
            const response = await fetch(URL_prices, {
                method: 'POST',
                body: JSON.stringify({
                    product_id: product.getId,
                    supermarkets: product.getSupermarkets

                }),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            serverResponseObject = await response.json();

            console.log('Server response', serverResponseObject);

            assert.ok(product);
        } catch (error) {
            console.error('Error while fetching products', error);
        }
    });
});