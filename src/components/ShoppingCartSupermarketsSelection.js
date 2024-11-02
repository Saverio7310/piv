function ShoppingCartSupermarketsSelection({ children, handleCheckboxChange, handleShoppingCartOptimization }) {

    const supermarkets = ['Supermercato 1', 'Supermercato 2', 'Supermercato 3'];

    return (
        <section className="shopping-cart-section">
            <h1>Ottimizzazione spesa</h1>
            <section className="shopping-cart-section">
                <h1>Seleziona i supermercati desiderati</h1>
                <div className="product-list-item">
                    <div className="product-list-item-content">
                        {supermarkets.map((supermarket, index) => {
                            return (
                                <div key={`supermarkets-selection-${index}`} className="container">
                                    <label htmlFor={`supermarket-input-${index}`} className="center-content supermarket-input-label stack">{supermarket}</label>
                                    <input
                                        id={`supermarket-input-${index}`}
                                        type="checkbox"
                                        className="supermarket-input-checkbox stack"
                                        value={supermarket}
                                        onChange={(e) => handleCheckboxChange(e.target.value, e.target.checked)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="center-content inner-spacing">
                        <button className="main-function-button" onClick={handleShoppingCartOptimization}>Ottimizza</button>
                    </div>
                </div>
            </section>
            {children}
        </section>
    );
}

export default ShoppingCartSupermarketsSelection;