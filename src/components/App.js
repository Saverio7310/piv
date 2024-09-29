import '../styles/App.css';
import '../styles/toast.css'
import Layout from './Layout.js';
import LandingPage from './LandingPage.js';
import ProductsListPage from './ProductsListPage.js';
import ProductInfoPage from './ProductInfoPage.js';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartProvider from './CartProvider.js';
import NotFoundPage from './NotFoundPage.js';
import ShoppingCart from './ShoppingCart.js';
import SelectedProductProvider from './SelectedProductProvider.js';
import ToastProvider from './ToastProvider.js';
import ToastsList from './ToastsList.js';

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
        <ToastProvider>
            <div className="App">
                <ToastsList />
                <CartProvider>
                    <SelectedProductProvider>
                        <RouterProvider router={router} />
                    </SelectedProductProvider>
                </CartProvider>
            </div>
        </ToastProvider>
    );
}

export default App;