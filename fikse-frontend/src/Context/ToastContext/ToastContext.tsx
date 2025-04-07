// src/contexts/ToastContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import styles from "../../Components/Toast/Toast.module.scss"

type ToastType = "success" | "error" | "info" | "warning";

interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (title: string, description: string, type?: ToastType, duration?: number) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Duration in milliseconds
const DEFAULT_DURATION = 3000;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (
    title: string,
    description: string,
    type: ToastType = "info",
    duration = DEFAULT_DURATION
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, description, type, duration };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);

    if (duration) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
    
    return id;
  };

  const hideToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Toast Container component to display the toasts
const ToastContainer = () => {
  const { toasts, hideToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.toast_container}>
      {toasts.map((toast) => (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div 
          key={toast.id} 
          className={`${styles.toast} ${styles[`toast_${toast.type}`]}`}
          onClick={() => hideToast(toast.id)}
        >
          <div className={styles.toast_content}>
            <h4 className={styles.toast_title}>{toast.title}</h4>
            <p className={styles.toast_description}>{toast.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};