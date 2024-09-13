import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <main>
            <div style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: "center",
                }
            }>
                <h1>Pagina inesistente!</h1>
                <Link to={'/'} style={{margin: '40px'}}>Clicca qui per tornare alla pagina principale</Link>
            </div>
        </main>
    );
}

export default NotFoundPage;