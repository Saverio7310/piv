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

import '../styles/ProductPricesChart.css';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
);

function ProductPricesChart({ prices }) {
    const unitPricesArray = prices.getUnitPricesArray;
    const pricesArray = prices.getPricesArray;
    const discountedPrices = prices.getDiscountedPrices;
    const data = {
        labels: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', ].slice(0, unitPricesArray.length),
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
    const { minValue, maxValue } = prices.getMinMax();
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
            <p style={{ margin: 0 }}>* I prezzi in sconto sono segnalati in arancione</p>
        </div>
    );
}

export default ProductPricesChart;