/**
     * Create the right URI to use as path
     * @param {string} pathValue Product's name
     * @returns {string}
     */
export default function getURI(pathValue) {
    return encodeURIComponent(pathValue);
}