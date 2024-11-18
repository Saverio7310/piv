import { useContext } from "react";

import { ToastContext } from "./ToastProvider";

import '../styles/ToastsList.css';

function ToastsList() {
    const { toasts } = useContext(ToastContext);

    return (
        <div className='toast-messages-panel panel-dimensions'>
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