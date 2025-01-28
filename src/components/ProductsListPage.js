import { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from "react-router-dom";

import ProductCard from './ProductCard.js';

import Product from '../model/Product.js';
import SessionStorage from '../model/SessionStorage.js';
import { createTestDataWithPrices } from "../utils/generatePropData";

import testProdImg from '../images/propLogo.png';

import '../styles/ProductsListPage.css';
import handleProductNameURI from '../utils/productURI.js';
import printCurrentInfo from '../utils/logObject.js';

function ProductsListPage() {
    /**
     * @type {[Array<Product>, React.Dispatch<React.SetStateAction<never[]>>]}
     */
    const [productsFetched, setProductsFetched] = useState([]);
    const [iteration, setIteration] = useState(0);
    const preloadingData = useRef(true);
    const canFetch = useRef(true);
    const fetchResult = useRef(true);
    const scrollPercentage = useRef(0);
    const limitReached = useRef(false);
    const hasJustPreload = useRef(false);
    const location = useLocation();
    const searchQuery = location.state?.searchQuery;
    /**
     * Add scroll handle to the window page to understand when it's possible to send
     * the next request
     */
    useEffect(() => {
        console.log('Effect starting - scroll');
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const totalScrollableHeight = scrollHeight - clientHeight;
            const currentScrollPosition = scrollTop;
            const percentage = (currentScrollPosition / totalScrollableHeight) * 100;
            scrollPercentage.current = percentage;

            /**
             * The fetchResult is used to understand whether there are still products
             * to fetch or not
             */
            if (fetchResult && percentage >= 70 && !limitReached.current) {
                setIteration(i => i + 10);
                limitReached.current = true;
            }
            /**
             * For now I'll keep saving the position in the sessionStorage
             * When I'l found the way to handle it better, I'll avoid doing this
             */
            if (scrollTop > 100)
                SessionStorage.setValue(SessionStorage.pageYcoordKey, scrollTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setIteration]);

    /**
     * Preload the data if the query was the same as the last performed. For instance,
     * if you click a ProductCard and come back to the ProductListPage, you will find
     * the products already fetched still there
     * Instead, if the query is different it delete all the products from the list and
     * from the sessionStorage
     */
    useEffect(() => {
        console.log('Effect starting - Preloading');
        const data = SessionStorage.getProductList();
        if (data) {
            if (data.searchQuery === searchQuery && preloadingData.current) {
                console.log('Session data', printCurrentInfo(data));
                preloadingData.current = false
                canFetch.current = false
                hasJustPreload.current = true;
                setProductsFetched(data.products);
                setIteration(data.iteration + 10);
            } else if (data.searchQuery !== searchQuery) {
                setProductsFetched([]);
                setIteration(0);
                SessionStorage.clearProductList();
            }
        }
    }, [searchQuery, setIteration]);

    /**
     * Fetching of the data if the conditions are right:
     * - if there is some data not to be loaded form sessionStorage
     * - if the existing data has already been loaded
     */
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        console.log('Effect starting - fetch');
        console.log('Iteration value', iteration);

        async function fetchData() {
            try {
                const correctURI = handleProductNameURI(searchQuery);
                const response = await fetch(`http://192.168.1.88:3030/api/v1/products/${correctURI}?offset=${iteration}&limit=${10}`, { signal });
                //(`https://jsonplaceholder.typicode.com/posts?userId=${iteration}`, { signal });
                const serverResponseObject = await response.json();
                const { rowCount, data } = serverResponseObject;
                console.log('Fetched data (products)', serverResponseObject);
                if (data.length === 0)
                    return;
                const dataObjects = data.map((prod) => {
                    //const prices = createTestDataWithPrices(3);
                    return new Product(prod.product_id, prod.name, 'body description', prod.quantity_unit, prod.quantity_value, testProdImg, 1);
                    //return new Product(prod.id, prod.title, prod.body, testProdImg, prices, 1);
                });
                console.log('Fetched products array', printCurrentInfo(dataObjects));
                setProductsFetched((prevProds) => {
                    return prevProds.concat(dataObjects);
                });
                SessionStorage.saveProductList({
                    searchQuery: searchQuery,
                    iteration: iteration,
                    products: dataObjects,
                });
                limitReached.current = false;
            } catch (error) {
                console.error('Error while fetching products', error);
            }
        }

        /**
         * This logic is being used because og these reasons:
         * 1: if the data has been loaded from the browser storage, it will skip the
         *    very next fetching
         * 2: loading data from browser storage sets the latest iteration value
         *    (state variable) which triggers a new render. This means that the first
         *    fetch will be skipped but the re-render will fetch again since the
         *    canFetch variable will be set to true. So there is the need for another
         *    variable, hasJustPreload, that makes the page skip the second fetch as well
         */
        if (canFetch.current) {
            console.log('Fetching data');
            if (hasJustPreload.current) {
                hasJustPreload.current = false;
                return;
            }
            fetchData()
        } else {
            console.log('Didn\'t fetch data');
            canFetch.current = true;
        }

        return () => {
            try {
                controller.abort();
            } catch (error) {
                console.error('Error', error.name);
            }
        }
    }, [iteration, searchQuery]);

    /* useEffect(() => {
        function smoothScrollTo(targetPixelPosition) {
            const dummyElement = document.createElement('div');
            dummyElement.style.position = 'absolute';
            dummyElement.style.top = `${targetPixelPosition}px`;
            document.body.appendChild(dummyElement);

            dummyElement.scrollIntoView({ behavior: 'smooth' });

            // Remove the dummy element after scrolling
            document.body.removeChild(dummyElement);
        }
        const timeOut = setTimeout(() => {
            smoothScrollTo(SessionStorage.getValue(SessionStorage.pageYcoordKey));
            //SessionStorage.removeValue(SessionStorage.pageYcoordKey);
        }, 500);

        return () => clearInterval(timeOut);
    }, []); */

    if (!productsFetched || !searchQuery) {
        return (
            <main>
                <div>
                    <h1>Qualcosa è andato storto</h1>
                    <Link to={'/'}>Clicca qui per tornare alla pagina principale</Link>
                </div>
            </main>
        );
    }
    return (
        <main>
            <div className='products-list-page'>
                <div className="product-list-page-info">
                    <h1 className='product-list-page-info-message'>Risultati della ricerca "{searchQuery}" ({productsFetched.length})</h1>
                </div>
                <div className="products-list-page-grid">
                    {productsFetched.map((prod) => <ProductCard key={prod.getId} product={prod} />)}
                </div>
            </div>
        </main>
    );
}

export default ProductsListPage;