function ProductPriceInfo({ prices: { weight, unitPricesArray, pricesArray, discountedPrices } }) {
    function computeAVG(arrayToAVG, discountArray, occ) {
        return arrayToAVG.reduce((acc, price, index) => {
            if (!discountArray[index]) {
                return acc + price
            }
            return acc + 0;
        }, 0) / (arrayToAVG.length - occ);
    }
    function computeChangeRatio(actualValue, AVG) {
        return ((actualValue * 100) / AVG) - 100;
    }
    function computeSign(value) {
        if (value == 0)
            return 0;
        if (value < 0)
            return -1;
        return 1;
    }
    function getSpanElement(ratio, value) {
        let color;
        let sign = '';
        switch (ratio) {
            case 0:
                color = 'lightgrey';
                sign = '+';
                break;
            case 1:
                color = 'red';
                sign = '+';
                break;
            case -1:
                color = 'green';
                break;
        }
        return (<span style={{color: color}}>{sign}{value.toFixed(2)}%</span>);
    }
    const nowDiscounted = discountedPrices[discountedPrices.length -1] ? true : false;
    const lastPrice = (pricesArray[pricesArray.length - 1]);
    const lastUnitPrice = (unitPricesArray[unitPricesArray.length - 1]);
    const discountOccurrences = discountedPrices.reduce((acc, isDIscounted) => {
        return acc + isDIscounted;
    }, 0);
    const unitPricesAVG = computeAVG(unitPricesArray, discountedPrices, discountOccurrences);
    const pricesAVG = computeAVG(pricesArray, discountedPrices, discountOccurrences);
    const unitPriceRatio = computeChangeRatio(lastUnitPrice, unitPricesAVG);
    const priceRatio = computeChangeRatio(lastPrice, pricesAVG);

    return (
        <div className="product-price-info">
            <h1>Prezzo attuale: €{lastPrice.toFixed(2)}</h1>
            <p>{getSpanElement(computeSign(unitPriceRatio), unitPriceRatio)} rispetto alla media: €{pricesAVG.toFixed(2)}
            </p>
            <h1>Prezzo al Kg attuale: €{lastUnitPrice.toFixed(2)}</h1>
            <p>{getSpanElement(computeSign(unitPriceRatio), unitPriceRatio)} rispetto alla media: €{unitPricesAVG.toFixed(2)}</p>
            <p>Il prodotto {nowDiscounted ? '' : 'NON'} È in SCONTO!</p>
            {nowDiscounted && 
                <>
                    <p>Il prezzo scontato è più {lastPrice >= pricesAVG ? <span style={{color: 'red'}}>ALTO</span> : <span style={{color: 'green'}}>BASSO</span>} rispetto alla media: €{pricesAVG.toFixed(2)}</p>
                    <p>Il prezzo scontato è più {lastPrice >= pricesAVG ? <span style={{color: 'red'}}>ALTO</span> : <span style={{color: 'green'}}>BASSO</span>} rispetto alla media: €{unitPricesAVG.toFixed(2)}</p>
                </> 
            }

        </div>
    );
}

export default ProductPriceInfo;