import { ImBin } from 'react-icons/im';
import { FaPlus, FaMinus } from 'react-icons/fa6';

import '../styles/ProductShoppingListItem.css';
import '../styles/ProductOptShoppingListItem.css';

/**
 * Incoming prop 'type' is a number value representing:
 *      1: the list containing all the prices
 *      0: the list containing the minimum price for the product 
 */
function ProductListItem({ type, prod, handleProductDeletion, minPrice, isDiscounted, handleProductCountChange }) {
    return (
        <li className='product-list-item'>
            <div className='product-list-item-content'>
                <div className="product-list-item-element product-list-item-image">
                    <img src={prod.getImage} alt="Product" className='product-list-item-picture' />
                </div>
                <div className={`product-list-item-element product-list-item-name ${!type ? 'section-product-name' : ''}`}>
                    <h1 className="product-list-item-h1">{prod.getName}</h1>
                </div>
                {type ? (
                    <>
                        <div className="product-list-item-element product-list-item-prices">
                            {prod.getPrices.map((price, index) => {
                                const nowDiscounted = price.isNowDiscounted();
                                const lastPrice = price.getLatestPrice(nowDiscounted);
                                return (
                                        <p key={`product-prices-${index}`} className={`product-list-item-price ${nowDiscounted ? 'discount' : ''}`}>
                                            <span className='product-list-item-supermarket'>{price.getSupermarketName}</span>
                                            €{lastPrice.toFixed(2)}
                                        </p>
                                );
                            })}
                        </div> 
                        <div className="product-list-item-element product-list-item-deletion center-element">
                            <ImBin className="product-list-item-svg destructive-button" onClick={() => handleProductDeletion(prod)}></ImBin>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="product-list-item-element product-list-item-quantity-container center-content">
                            <div className="product-list-item-quantity-content center-content">
                                <div className="shopping-cart-product-count-button minus-button-icon secondary-button">
                                    <FaMinus className="shopping-cart-product-count-button-icon" onClick={() => handleProductCountChange(prod, -1)} />
                                </div>
                                <p className="product-list-item-quantity">Quantità: {prod.getCount}</p>
                                <div className="shopping-cart-product-count-button plus-button-icon primary-button">
                                    <FaPlus className="shopping-cart-product-count-button-icon" onClick={() => handleProductCountChange(prod, 1)} />
                                </div>
                            </div>
                        </div>
                        <div className="product-list-item-element section-product-price">
                            <h1 className={`product-list-item-price ${isDiscounted ? 'discount' : ''}`}>€{(prod.getCount * minPrice).toFixed(2)}</h1>
                        </div>
                    </>
                )}
            </div>
        </li>
    );
}

export default ProductListItem;