import { useContext } from "react";
import { ToastContext } from "./ToastProvider";

function ToastsList() {
    const { toasts } = useContext(ToastContext);

    return (
        <div className='toast-messages-panel'>
            <ul className='toast-messages-list'>
                {
                    toasts.map((toast) => {
                        console.log(toast);
                        return (
                            <li key={toast.id} className={`toast-message-item ${toast.type}-toast`}>
                                <div className="toast-message-content">
                                    <h1>{toast.message}</h1>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default ToastsList;