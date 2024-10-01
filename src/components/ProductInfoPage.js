import { useContext, useEffect } from "react";
import '../styles/productInfoPage.css'
import ProductDiscountInfo from './ProductDiscountInfo';
import { PiShoppingCartThin } from 'react-icons/pi'
import { CartContext } from "./CartProvider";
import { SelectedProductContext } from "./SelectedProductProvider";
import { ToastContext } from "./ToastProvider";
import SessionStorage from "../model/SessionStorage";

function ProductInfoPage() {
    const { cart, handleAddProduct } = useContext(CartContext);
    const { addToast, TYPES } = useContext(ToastContext);
    const { selectedProduct, handleAddSelectedProduct } = useContext(SelectedProductContext);

    useEffect(() => {
        console.log('Use Effect - Checking Product');
        if (selectedProduct)
            return;
        const product = SessionStorage.getSelectedProduct();
        handleAddSelectedProduct(product);
    }, [handleAddSelectedProduct]);

    function handleAddProductToCart(selectedProduct) {
        const check = cart.findIndex((prod) => prod.getId === selectedProduct.getId);
        const id = Date.now();
        if (check === -1) {
            handleAddProduct(selectedProduct);
            addToast({ id: id, type: TYPES.success, message: `Prodotto aggiunto al carrello` });
        } else {
            addToast({ id: id, type: TYPES.info, message: `Prodotto già nel carrello` });
            console.log('Prodotto già presente nel carrello');
        }
    }

    if (!selectedProduct || !selectedProduct.getName) {
        return (
            <main>
                <div>
                    <h1>Informazioni prodotto mancanti</h1>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="product-info-page">
                <div className="product-image">
                    <img src={selectedProduct.getImage} alt='Product' className='product-picture' />
                </div>
                <div className="product-info">
                    <h1>{selectedProduct.getName}</h1>
                    <p>{selectedProduct.getDescription}</p>
                    <div className="add-cart">
                        <button className="add-cart-button" onClick={() => handleAddProductToCart(selectedProduct)}>
                            <div className="add-cart-button-content">
                                <p className="add-cart-button-text">Aggiungi</p>
                                <PiShoppingCartThin className="add-cart-button-icon" />
                            </div>
                        </button>
                    </div>
                </div>
                <ProductDiscountInfo product={selectedProduct.getPrices} />
            </div>
        </main>
    );
}

export default ProductInfoPage;