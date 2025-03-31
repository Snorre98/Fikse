import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { ModalHeader } from "./ModalHeader";
import { ModalDescription } from "./ModalDescription";
import { ModalContent } from "./ModalContent";
import { ModalFooter } from "./ModalFooter";
import styles from "./FikseModal.module.scss";

type FikseModalProps = {
    modalHeader?: ReactNode;
    modalDescription?: ReactNode;
    modalContent?: ReactNode;
    modalFooter?: ReactNode;
    onOpen?: () => void;
    onClose?: () => void;
}


export function FikseModal({modalHeader, modalDescription, modalContent, modalFooter, onOpen, onClose}: FikseModalProps) {
    const modalRef= useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if(isOpen){
            onOpen;
            modalRef.current?.showModal();
        }
        else{
            onClose
            modalRef.current?.close();
        }
    },[isOpen, onOpen, onClose])

    return (
        <Fragment>
            <dialog ref={modalRef} className={styles.fikse_modal_wrapper}>
            <button type="button" onClick={() => setIsOpen(false)}>Lukk</button>
            <div>
                {modalHeader && <ModalHeader>{modalHeader}</ModalHeader>}
                {modalDescription && <ModalDescription>{modalDescription}</ModalDescription>}
                {modalContent && <ModalContent>{modalDescription}</ModalContent>}
                {modalFooter && <ModalFooter>{modalDescription}</ModalFooter>}
            </div>
        </dialog>
        <button type="button" onClick={() => setIsOpen(true)}>Åpne</button>
        </Fragment>
    )
}