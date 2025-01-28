import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SelectedProductContext } from "./SelectedProductProvider";

import '../styles/ProductCard.css';
import handleProductNameURI from "../utils/productURI";

function ProductCard({ product }) {
    const navigate = useNavigate();
    const { handleAddSelectedProduct } = useContext(SelectedProductContext);

    function handleClick() {
        handleAddSelectedProduct(product);
        const productURI = handleProductNameURI(product.getName);
        navigate(`/products/${productURI}`);
    }

    return (
        <div key={product.getId} className="product-card" onClick={handleClick}>
            <div className="product-card-img">
                <img src={product.getImage} alt='Product' className='product-card-image' />
            </div>
            <div className="product-card-title">
                <h1>{product.getName}</h1>
            </div>
        </div>
    );
}

export default ProductCard;