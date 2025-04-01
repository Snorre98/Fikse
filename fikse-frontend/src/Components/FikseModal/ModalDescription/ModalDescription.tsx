import type { ReactNode } from "react"

type ModalDescriptionProps = {
    children: ReactNode;
    className: string;
}

export function ModalDescription({children, className}: ModalDescriptionProps){
    return (
        <div className={className}>
            {children}
        </div>
    )
}