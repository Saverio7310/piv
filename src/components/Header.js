import websiteLogo from '../images/propLogo.png';
import lensLogo from '../images/searchIcon.png';

function Header() {
    function handleSubmit(event) {
        event.preventDefault();
        console.log('Input value:');
      };

    return (
        <header>
            <div className="logo">
                <img src={websiteLogo} alt="Website Logo"/>
            </div>
            <div className="search-bar">
                <form onSubmit={handleSubmit}>
                    <div className='search-bar-form-div'>
                        <input className='search-bar-input' type="text" placeholder="Cerca un prodotto"/>
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