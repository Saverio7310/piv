import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
);

function ProductPricesChart({ prices: { weight, unitPricesArray, pricesArray, discountedPrices } }) {
    const data = {
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', ].slice(0, unitPricesArray.length),
        datasets: [
            {
                label: 'Prezzi al Kg',
                data: unitPricesArray,
                backgroundColor: 'white',
                borderColor: 'darkgrey',
                pointBorderColor: 'darkgrey',
                pointBackgroundColor: discountedPrices.map((isDiscounted) => {
                    return isDiscounted ? '#F6511D' : 'white';
                }),
                borderWidth: 1.5,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
            {
                label: 'Prezzi prodotto',
                data: pricesArray,
                backgroundColor: 'white',
                borderColor: 'black',
                pointBorderColor: 'black',
                pointBackgroundColor: discountedPrices.map((isDiscounted) => {
                    return isDiscounted ? '#F6511D' : 'white';
                }),
                borderWidth: 1.5,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
        ]
    };
    let minValue = Number.MAX_SAFE_INTEGER;
    let maxValue = Number.MIN_SAFE_INTEGER;
    unitPricesArray.forEach(price => {
        if (price <= minValue)
            minValue = price;
        if (price >= maxValue)
            maxValue = price;
    });
    pricesArray.forEach(price => {
        if (price <= minValue)
            minValue = price;
        if (price >= maxValue)
            maxValue = price;
    });
    minValue = Math.max(0 , Math.floor(minValue));
    maxValue = Math.ceil(maxValue);
    const options = {
        plugins: {
            legend: true
        },
        scales: {
            y: {
                min: minValue,
                max: maxValue,
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
    };

    return (
        <div className='product-prices-chart'>
            <Line data={data} options={options} ></Line>
            <p style={{margin: 0}}>* I prezzi in sconto sono segnalati in arancione</p>
        </div>
   );
}

export default ProductPricesChart;