import copy from 'copy-to-clipboard'

export default function copyShoppingListToClipboard(optimizedShoppingCart, cart) {
    let text = '';
    let total = 0;
    optimizedShoppingCart.forEach(({ supermarketName, products }) => {
        let partial = 0;
        text += supermarketName + ':';
        products.forEach((product) => {
            const prod = cart.find((p) => p.getId === product.productID);
            const line = `\n- ${prod.getName} ${prod.getQuantityValue} ${prod.getQuantityUnit}, ${prod.getBrand} x${prod.getCount}, €${(prod.getCount * product.minPrice).toFixed(2)}`;
            text += line;
            partial += product.minPrice * prod.getCount;
        })
        text += `\nPARZIALE: €${partial.toFixed(2)}\n\n`;
        total += partial;
        partial = 0;
    })
    text += `TOTALE SPESA: €${total.toFixed(2)}`;
    const copyResult = copy(text, { message: "Lista salvata" });
    return copyResult;
}