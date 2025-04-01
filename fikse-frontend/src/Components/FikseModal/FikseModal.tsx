import { Fragment, useCallback, useState, type ReactNode } from "react";
import { ModalHeader } from "./ModalHeader";
import { ModalDescription } from "./ModalDescription";
import { ModalContent } from "./ModalContent";
import { ModalFooter } from "./ModalFooter";
import styles from "./FikseModal.module.scss";

type FikseModalProps = {
    modalHeader: ReactNode;
    modalDescription?: ReactNode;
    modalContent?: ReactNode;
    modalFooter?: ReactNode;
    onOpen?: () => void;
    onClose?: () => void;
    initialOpen?: boolean;
    openBtnText?: string;
    closeBtnText?: string;
}

export function FikseModal({
    modalHeader, 
    modalDescription, 
    modalContent, 
    modalFooter, 
    onOpen, 
    onClose,
    initialOpen = false,
    openBtnText = "Open",
    closeBtnText= "Close"
}: FikseModalProps) {
    const [isOpen, setIsOpen] = useState(initialOpen);
    
    
    const closeModal = useCallback(() => {
        setIsOpen(false);
        if (onClose) onClose();
    }, [onClose]);
    
    const openModal = useCallback(() => {
        setIsOpen(true);
        if (onOpen) onOpen();
    }, [onOpen]);
    
    if (!isOpen) {
        return <button type="button" onClick={openModal}>{openBtnText}</button>;
    }
    
    return (
        <Fragment>
            <div className={styles.modal_overlay}>
                <div className={styles.fikse_modal_wrapper}>
                    <div className={styles.modal_header_wrapper}>
                        {modalHeader && <ModalHeader className={styles.modal_header}>{modalHeader}</ModalHeader>}
                        <button 
                            type="button" 
                            className={styles.modal_close_btn} 
                            onClick={closeModal}
                        >
                            {closeBtnText}
                        </button>
                    </div>
                    {modalDescription && <ModalDescription className={styles.modal_description}>{modalDescription}</ModalDescription>}
                    {modalContent && <ModalContent className={styles.modal_content}>{modalContent}</ModalContent>}
                    {modalFooter && <ModalFooter className={styles.modal_footer}>{modalFooter}</ModalFooter>}
                </div>
            </div>
            <button type="button" onClick={openModal}>{openBtnText}</button>
        </Fragment>
    );
}