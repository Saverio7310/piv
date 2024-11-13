import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiMagnifyingGlassThin, PiShoppingCartThin } from 'react-icons/pi';

import { CartContext } from './CartProvider';

import websiteLogo from '../images/propLogo.png';

import '../styles/Header.css';

function Header() {
    const [input, setInput] = useState("");
    const navigate = useNavigate()
    const { cart } = useContext(CartContext);

    function handleSubmit(event) {
        event.preventDefault();
        setInput('');
        navigate('/products', { state: { searchQuery: input } });
    };

    const shoppingCartCounterMax = 10;

    return (
        <header>
            <div className="logo">
                <Link to={'/'}>
                    <img src={websiteLogo} alt="Website Logo" className="logo-img"/>
                </Link>
            </div>
            <div className="search-bar">
                <form onSubmit={handleSubmit} className="search-bar-form">
                    <div className='search-bar-form-div'>
                        <input
                            className='search-bar-input'
                            type="text"
                            placeholder="Cerca un prodotto"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button className='search-bar-icon-button' type='submit'>
                            <PiMagnifyingGlassThin className='search-bar-icon' />
                        </button>
                    </div>
                </form>
            </div>
            <div className="logo">
                <Link to={'/shopping-cart'} style={{ color: 'black' }}>
                    <PiShoppingCartThin className='logo-img shopping-cart' />
                    { cart.length > 0 && <span className="shopping-cart-count">{
                        cart.length <= shoppingCartCounterMax ? cart.length : `${shoppingCartCounterMax}+`
                    }</span> }
                </Link>
            </div>
        </header>
    );
}

export default Header;