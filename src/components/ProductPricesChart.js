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

function ProductPricesChart({ prices: { weight, unitPricesArray, pricesArray } }) {
    const data = {
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', ].slice(0, unitPricesArray.length),
        datasets: [
            {
                label: 'Prezzi al Kg',
                data: unitPricesArray,
                backgroundColor: 'white',
                borderColor: 'black',
                pointBorderColor: 'black',
                fill: true,
            },
            {
                label: 'Prezzi per prodotto',
                data: pricesArray,
                backgroundColor: 'white',
                borderColor: 'black',
                pointBorderColor: 'black',
                fill: true,
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
        }
    };

    return (
        <Line data={data} options={options} ></Line>
   );
}

export default ProductPricesChart;