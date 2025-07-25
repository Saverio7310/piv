import '../styles/LoadingMessage.css'

function LoadingMessage({ message }) {
    return (
        <div className='loading-div'>
            <h1 className='loading-message'>{message}</h1>
            <div className='spinner'></div>
        </div>
    );
}

export default LoadingMessage;