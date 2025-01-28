/**
     * Create the right URI to use as path
     * @param {string} productName Product's name
     * @returns {string}
     */
export default function handleProductNameURI(productName) {
    return productName.trim().toLowerCase().split(' ').join('-').replace('%', '%25');
}