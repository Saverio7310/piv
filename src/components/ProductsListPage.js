import ProductCard from './ProductCard.js'

import { useLocation, Link } from "react-router-dom";

function ProductsListPage() {
    const location = useLocation();
    const products = location.state?.products;
    const searchQuery = location.state?.searchQuery;
    if(!products || ! searchQuery) {
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
                <h1 className='product-list-page-result-message'>Risultati della ricerca "{searchQuery}" ({products.length})</h1>
                <div className="products-list-page">
                    {products.map((prod) => <ProductCard key={prod.key} product={prod} />)}
                </div>
            </div>
        </main>
    );
}

export default ProductsListPage;