import type { ReactNode } from "react"

type ModalDescriptionProps = {
    children: ReactNode;
}

export function ModalDescription({children}: ModalDescriptionProps){
    return (
        <div>
            {children}
        </div>
    )
}