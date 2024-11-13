import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SelectedProductContext } from "./SelectedProductProvider";

import '../styles/ProductCard.css';

function ProductCard({ product }) {
    const navigate = useNavigate();
    const { handleAddSelectedProduct } = useContext(SelectedProductContext);

    function handleClick() {
        handleAddSelectedProduct(product);
        navigate(`/products/${product.getName}`);
    }

    return (
        <div key={product.getId} className="product-card" onClick={handleClick}>
            <div className="product-card-img">
                <img src={product.getImage} alt='Product' className='product-card-image' />
            </div>
            <div className="product-card-title">
                <h1>Product name: {product.getName}</h1>
            </div>
            <div className="product-card-desc">
                <h2>Desc: {product.getId}</h2>
            </div>
        </div>
    );
}

export default ProductCard;