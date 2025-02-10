import { createContext, useState } from "react";

export const ToastContext = createContext()

function ToastProvider({ children }) {
    /**
     * Array oj objects in the form of
     *  {
     *      id: string,
     *      type: string,
     *      message: string
     *  }
     */
    const [toasts, setToasts] = useState([]);

    const TYPES = {
        success: 'success',
        info: 'info',
        warning: 'warning',
        error: 'error',
    }

    function removeToast(id) {
        setToasts(t => t.filter((toast) => toast.id !== id));
    }

    function addToast(toast) {
        if ('type' in toast && 'message' in toast) {
            if (!('id' in toast)) {
                toast.id = Date.now();
            }
            setToasts([ ...toasts, toast ]);
            setTimeout(() => {
                removeToast(toast.id);
            }, 3000);
        }
    }

    return (
        <ToastContext.Provider value={{ toasts, addToast, TYPES }}>
            {children}
        </ToastContext.Provider>
    );
}

export default ToastProvider;