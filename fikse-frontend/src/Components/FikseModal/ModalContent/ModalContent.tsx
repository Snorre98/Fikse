import type { ReactNode } from "react"

type ModalContentProps = {
    children: ReactNode;
}

export function ModalContent({children}: ModalContentProps){
    return (
        <div>
            {children}
        </div>
    )
}