import Header from './Header.js'
import Footer from './Footer.js'

import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;