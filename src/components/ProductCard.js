import testProdImg from '../images/propLogo.png';

import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const navigate = useNavigate();

    const { name, description, quantity, key } = product;

    function handleClick() {
        navigate(`/products/${name}`, { state: { product: { ...product, testProdImg } } });
    }

    return (
        <div key={key} className="product-card" onClick={handleClick}>
            <img src={testProdImg} alt='Product' className='product-card-image' />
            <h1>Product name: {name}</h1>
            <h2>Desc: {description}</h2>
            <h2>quantity: {quantity}</h2>
        </div>
    );
}

export default ProductCard;