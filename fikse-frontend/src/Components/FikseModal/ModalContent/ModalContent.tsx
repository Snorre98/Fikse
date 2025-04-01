import type { ReactNode } from "react"

type ModalContentProps = {
    children: ReactNode;
    className: string;
}

export function ModalContent({children, className}: ModalContentProps){
    return (
        <div className={className}>
            {children}
        </div>
    )
}