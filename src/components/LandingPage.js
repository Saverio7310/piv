import '../styles/LandingPage.css';
import landscapeTitle from '../images/landing-page-title.png'

function LandingPage() {
    const landingPageTitle = `Prezzi In Vista`;
    const landingPageDesc = `Fai la spesa consapevolmente`;
    const landingPageHelp = `
    Prezzi in Vista è il servizio che tiene traccia dei prezzi dei prodotti per te.
    Controlla la veridicità degli sconti, confronta i prodotti e i prezzi tra supermercati.
    `;
    return (
        <main>
            <div className='landing-page'>
                <div className='title-image'>
                    <img src={landscapeTitle} alt='Title' className='title-img' />
                </div>
                <div>
                    <h1 className='landing-page-desc'>{landingPageDesc}</h1>
                </div>
                <p className='landing-page-help'>{landingPageHelp}</p>
            </div>
        </main>
    );
}

export default LandingPage;