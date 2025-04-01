import type { ReactNode } from "react"

type ModalFooterProps = {
    children: ReactNode;
    className: string;
}

export function ModalFooter({children, className}: ModalFooterProps){
    return (
        <div className={className}>
            {children}
        </div>
    )
}