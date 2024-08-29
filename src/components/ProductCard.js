import testProdImg from '../images/propLogo.png';

import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const navigate = useNavigate();

    /* const { name, description, quantity, key } = product; */
    const { title, userId, id } = product;

    function handleClick() {
        navigate(`/products/${title}`, { state: { product: { ...product, testProdImg } } });
    }

    return (
        <div key={id * userId} className="product-card" onClick={handleClick}>
            <img src={testProdImg} alt='Product' className='product-card-image' />
            <h1>Product name: {title}</h1>
            <h2>Desc: {userId + ' - ' + id}</h2>
            {/* <h2>quantity: {quantity}</h2> */}
        </div>
    );
}

export default ProductCard;