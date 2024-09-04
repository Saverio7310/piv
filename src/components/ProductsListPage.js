import { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard.js'
import SessionStorage from '../utils/sessionStorage.js';

import { useLocation, Link } from "react-router-dom";

function ProductsListPage() {
    const [productsFetched, setProductsFetched] = useState([]);
    const [iteration, setIteration] = useState(1);
    const preloadingData = useRef(true);
    const canFetch = useRef(true);
    const fetchResult = useRef(true);
    const scrollPercentage = useRef(0);
    const limitReached = useRef(false);
    //const pageYcoord = useRef(0);
    const location = useLocation();
    //const products = location.state?.products;
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
                setIteration(i => i + 1);
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
                console.log('Session data', data);
                preloadingData.current = false
                canFetch.current = false
                setProductsFetched(data.products);
                setIteration(data.iteration + 1);
            } else if (data.searchQuery !== searchQuery) {
                setProductsFetched([]);
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
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${iteration}`, { signal });
                const data = await response.json();
                //console.log('Fetched data', data);
                if (data.length === 0)
                    return;
                setProductsFetched((prevProds) => {
                    return prevProds.concat(data);
                });
                SessionStorage.saveProductList({
                    searchQuery: searchQuery,
                    iteration: iteration,
                    products: data,
                });
                limitReached.current = false;
            } catch (error) {
                console.error('Error while fetching', error);
            }
        }

        if (canFetch.current) {
            console.log('Fetching data');
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

    useEffect(() => {
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
    }, []);

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
            <div className='products-list-page-container'>
                <h1 className='product-list-page-result-message'>Risultati della ricerca "{searchQuery}" ({productsFetched.length})</h1>
                <div className="products-list-page">
                    {productsFetched.map((prod) => <ProductCard key={prod.id} product={prod} />)}
                </div>
            </div>
        </main>
    );
}

export default ProductsListPage;