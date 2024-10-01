import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SelectedProductContext } from "./SelectedProductProvider";


function ProductCard({ product }) {
    const navigate = useNavigate();
    const { handleAddSelectedProduct } = useContext(SelectedProductContext);

    function handleClick() {
        handleAddSelectedProduct(product);
        navigate(`/products/${product.getName}`);
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