import '../styles/App.css';
import Layout from './Layout.js';
import LandingPage from './LandingPage.js';
import ProductsListPage from './ProductsListPage.js';
import ProductInfoPage from './ProductInfoPage.js';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartProvider from './CartProvider.js';
import NotFoundPage from './NotFoundPage.js';
import ShoppingCart from './ShoppingCart.js';
import SelectedProductProvider from './SelectedProductProvider.js';

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
        {
            path: '/shopping-cart',
            element: <ShoppingCart />
        },
        {
            path: '*',
            element: <NotFoundPage />
        },
    ]
}]);


function App() {
    return (
        <div className="App">
            <CartProvider>
                <SelectedProductProvider>
                    <RouterProvider router={router} />
                </SelectedProductProvider>
            </CartProvider>
        </div>
    );
}

export default App;