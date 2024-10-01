function ProductPriceInfo({ prices }) {
    function computeChangeRatio(actualValue, AVG) {
        return ((actualValue * 100) / AVG) - 100;
    }
    function computeSign(value) {
        if (value === 0)
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
            default:
                color = 'lightgrey';
                sign = '+';
        }
        return (<span style={{ color: color }}>{sign}{value.toFixed(2)}%</span>);
    }

    const { lastUnitPrice, lastPrice, nowDiscounted } = prices.getLatestReport();
    const { unitPricesAVG, pricesAVG } = prices.getAVGs();

    const unitPriceRatio = computeChangeRatio(lastUnitPrice, unitPricesAVG);
    const priceRatio = computeChangeRatio(lastPrice, pricesAVG);

    return (
        <div className="product-price-info">
            <h1>Prezzo attuale: €{lastPrice.toFixed(2)}</h1>
            <p>{getSpanElement(computeSign(priceRatio), priceRatio)} rispetto alla media: €{pricesAVG.toFixed(2)}
            </p>
            <h1>Prezzo al Kg attuale: €{lastUnitPrice.toFixed(2)}</h1>
            <p>{getSpanElement(computeSign(unitPriceRatio), unitPriceRatio)} rispetto alla media: €{unitPricesAVG.toFixed(2)}</p>
            <p>Il prodotto {nowDiscounted ? '' : 'NON'} È in SCONTO!</p>
            {nowDiscounted &&
                <>
                    <p>Il prezzo scontato è più {lastPrice >= pricesAVG ? <span style={{ color: 'red' }}>ALTO</span> : <span style={{ color: 'green' }}>BASSO</span>} rispetto alla media: €{pricesAVG.toFixed(2)}</p>
                    <p>Il prezzo scontato è più {lastPrice >= pricesAVG ? <span style={{ color: 'red' }}>ALTO</span> : <span style={{ color: 'green' }}>BASSO</span>} rispetto alla media: €{unitPricesAVG.toFixed(2)}</p>
                </>
            }

        </div>
    );
}

export default ProductPriceInfo;