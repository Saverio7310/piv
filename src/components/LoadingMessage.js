import '../styles/LoadingMessage.css'

function LoadingMessage({ message }) {
    return (
        <div className='loading-div'>
            <h1 className='product-list-page-info-message'>{message}</h1>
            <div className='spinner'></div>
        </div>
    );
}

export default LoadingMessage;