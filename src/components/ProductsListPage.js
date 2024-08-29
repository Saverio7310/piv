import { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard.js'

import { useLocation, Link } from "react-router-dom";

function ProductsListPage() {
    const [productsFetched, setProductsFetched] = useState([]);
    const [iteration, setIteration] = useState(1);
    const fetchResult = useRef(true);
    const scrollPercentage = useRef(0);
    const limitReached = useRef(false);
    const location = useLocation();
    const products = location.state?.products;
    const searchQuery = location.state?.searchQuery;
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const totalScrollableHeight = scrollHeight - clientHeight;
            const currentScrollPosition = scrollTop;
            const percentage = (currentScrollPosition / totalScrollableHeight) * 100;
            scrollPercentage.current = percentage;

            if(fetchResult && percentage >= 60 && !limitReached.current) {
                setIteration(i => i + 1);
                limitReached.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        console.log('Effect starting');
        
        async function fetchData() {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${iteration}`, { signal });
                const data = await response.json();
                console.log('Fetched data', data);
                if(data.length === 0)
                    return;
                setProductsFetched((prevProds) => {
                    return prevProds.concat(data);
                });
                limitReached.current = false;
            } catch (error) {
                console.error('Error while fetching', error);
            }
        
        }
        
        fetchData()
        
        return () => controller.abort();
    }, [iteration]);



    if (!products || !searchQuery) {
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