import { type ReactNode, useState } from "react";
import styles from "./Toast.module.scss";

type ToastProps = {
	title?: string;
	description?: string;
	onShow?: () => void;
	children?: ReactNode;
};

export function Toast({ title="title", description="description desciondescion desption description", children, onShow }: ToastProps) {
	const [display, setDisplay] = useState(true);



	return (
		<div className={styles.toast_wrapper}>
			{display && (
				<div className={styles.toast}>
					<h4 className={styles.toast_title}>{title}</h4>
					<p className={styles.toast_description}>{description}</p>
				</div>
			)}
			{children}
		</div>
	);
}
