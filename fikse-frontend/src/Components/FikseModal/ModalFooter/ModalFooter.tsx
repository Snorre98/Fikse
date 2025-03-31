import type { ReactNode } from "react"

type ModalFooterProps = {
    children: ReactNode;
}

export function ModalFooter({children}: ModalFooterProps){
    return (
        <div>
            {children}
        </div>
    )
}