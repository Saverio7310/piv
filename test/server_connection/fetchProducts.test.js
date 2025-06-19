import { describe } from "mocha";
import assert from "assert";
import Product from "../../src/model/Product";
import getURI from "../../src/utils/getURI";

describe('Products fetch', function () {
    it('should fetch and manage products correctly', async function () {
        try {
            const correctURI = getURI('abbracci');
            const URL = `http://localhost:3030/api/v1/products2/${correctURI}?offset=${0}&limit=${10}`;
            const response = await fetch(URL);
            const serverResponseObject = await response.json();
            const { rowCount, data } = serverResponseObject;
            const dataObjects = data.map(prod => Product.create(prod));
            
            console.log('Server response', rowCount, data);
            console.log('Products array', dataObjects);

            assert.ok(dataObjects);
        } catch (error) {
            console.error('Error while fetching products', error);
        }
    });
});