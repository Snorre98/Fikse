import type { ReactNode } from "react";
import styles from "./Page.module.scss";

type PageProp = {
	children: ReactNode;
};

export function Page({ children }: PageProp) {
	return (
		<div className={styles.page_style}>
			<div
				style={{
					height: "100%",
					width: "100%",
					overflow: "auto",
				}}
			>
				{children}
			</div>
		</div>
	);
}
