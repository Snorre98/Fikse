import type { ReactNode } from "react"

type ModalHeaderProps = {
    children: ReactNode;
}

export function ModalHeader({children}: ModalHeaderProps){
    return (
        <div>
            {children}
        </div>
    )
}