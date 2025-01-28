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

function ProductPricesChart({ productPrice }) {
    console.log('Product Prices Chart', productPrice);
    const unitPrices = productPrice.getUnitPrices;
    const prices = productPrice.getPrices;
    const discountedPrices = productPrice.getDiscountedPrices;
    const discountedUnitPrices = productPrice.getDiscountedUnitPrices;
    const finalPrices = [];
    const finalUnitPrices = [];
    
    for (let i = 0; i < prices.length; i++) {
        if (discountedPrices[i] !== -1) {
            finalPrices.push(discountedPrices[i]);
            finalUnitPrices.push(discountedUnitPrices[i]);
        } else {
            finalPrices.push(prices[i]);
            finalUnitPrices.push(unitPrices[i]);
        }
    }

    const dates = productPrice.getDates.map(date => {
        return date.split('-').reverse().join('/');
    });
    const colorMap  = discountedPrices.map((discountedPrice) => {
        return discountedPrice !== -1 ? '#F6511D' : 'white';
    })
    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Prezzi unitari',
                data: finalUnitPrices,
                backgroundColor: 'white',
                borderColor: 'darkgrey',
                pointBorderColor: 'darkgrey',
                pointBackgroundColor: colorMap,
                borderWidth: 1.5,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
            {
                label: 'Prezzi finali',
                data: finalPrices,
                backgroundColor: 'white',
                borderColor: 'black',
                pointBorderColor: 'black',
                pointBackgroundColor: colorMap,
                borderWidth: 1.5,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
        ]
    };
    const { minValue, maxValue } = productPrice.getMinMax();
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
        responsive: true,
    };

    return (
        <div className='product-prices-chart min-dimensions'>
            <Line data={data} options={options} ></Line>
            <p className="chart-caption">* I prezzi in sconto sono segnalati in arancione</p>
        </div>
    );
}

export default ProductPricesChart;