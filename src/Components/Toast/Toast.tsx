import type { ReactNode } from "react";
import styles from "./Toast.module.scss";

type ToastProps = {
	title?: string;
	description?: string;
	children?: ReactNode;
};

export function Toast({ title="title", description="description desciondescion desption description", children }: ToastProps) {
	return (
		<div className={styles.toast_wrapper}>
			
				<div className={styles.toast}>
					<h4 className={styles.toast_title}>{title}</h4>
					<p className={styles.toast_description}>{description}</p>
				</div>
			
			{children}
		</div>
	);
}
