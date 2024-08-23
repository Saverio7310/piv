function Main() {
    const landingPageTitle = `Prezzi In Vista`;
    const landingPageDesc = `Descrizione da definire`;
    const landingPageHelp = `Maybe some images for reference`;
    return (
        <main>
            <div className='landing-page'>
                <h1 className='landing-page-title'><span className='accent'>{landingPageTitle}</span></h1>
                <p className='landing-page-desc'>{landingPageDesc}</p>
                <p className='landing-page-help'>{landingPageHelp}</p>
            </div>
        </main>
    );
}

export default Main;