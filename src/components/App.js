import '../styles/App.css';
import Layout from './Layout.js';
import LandingPage from './LandingPage.js';
import ProductsListPage from './ProductsListPage.js';
import ProductInfoPage from './ProductInfoPage.js';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([{
    path: '/',
    element: <Layout />,
    children: [
        {
            path: '/',
            element: <LandingPage />
        },
        {
            path: '/products',
            element: <ProductsListPage />
        },
        {
            path: '/products/:productID',
            element: <ProductInfoPage />
        },
    ]
}]);


function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;