import { useState } from 'react';
import websiteLogo from '../images/propLogo.png';
import lensLogo from '../images/searchIcon.png';
import '../styles/App.css'

import { Link, useNavigate } from 'react-router-dom';
import { PiMagnifyingGlassThin, PiShoppingCartThin } from 'react-icons/pi'

function Header() {
    const [input, setInput] = useState("");
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault();
        setInput('');
        navigate('/products', { state: { searchQuery: input } });
    };

    return (
        <header>
            <Link to={'/'} className="logo">
                <img src={websiteLogo} alt="Website Logo" />
            </Link>
            <div className="search-bar">
                <form onSubmit={handleSubmit}>
                    <div className='search-bar-form-div'>
                        <input
                            className='search-bar-input'
                            type="text"
                            placeholder="Cerca un prodotto"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button className='search-bar-icon-button' type='submit'>
                            <PiMagnifyingGlassThin className='search-bar-icon'/>
                        </button>
                    </div>
                </form>
            </div>
            <div className="logo shopping-cart">
                <PiShoppingCartThin className='shopping-cart-icon'/>
            </div>
        </header>
    );
}

export default Header;