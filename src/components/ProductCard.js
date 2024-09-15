import { useNavigate } from "react-router-dom";


function ProductCard({ product }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/products/${product.getName}`, { state: { product } } );
    }

    return (
        <div key={product.getId} className="product-card" onClick={handleClick}>
            <img src={product.getImage} alt='Product' className='product-card-image' />
            <h1>Product name: {product.getName}</h1>
            <h2>Desc: {product.getId}</h2>
        </div>
    );
}

export default ProductCard;