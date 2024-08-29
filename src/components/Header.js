import { useState } from 'react';
import websiteLogo from '../images/propLogo.png';
import lensLogo from '../images/searchIcon.png';
import '../styles/App.css'

import { Link, useNavigate } from 'react-router-dom';

function createTestData(numberOfElements){
    const testData = [];
    for (let i = 1; i <= numberOfElements; i++) {
        const element = {};
        element.name = `Prod${i}`;
        element.description = `Prod${i} description`;
        element.quantity = i;
        element.id = `${i}`;
        testData.push(element);
    }
    return testData;
}

function Header() {
    const [input, setInput] = useState("");
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault();
        setInput('');
        const testData = createTestData(30);
        navigate('/products', {state: { products: testData, searchQuery: input} });
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
                            <img className='search-bar-icon' src={lensLogo} alt='Search button'></img>
                        </button>
                    </div>
                </form>
            </div>
            <div className="logo"></div>
        </header>
    );
}

export default Header;