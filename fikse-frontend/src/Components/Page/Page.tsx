import type { ReactNode } from "react";
import styles from "./Page.module.scss";

type PageProp = {
	children: ReactNode;
};

export function Page({ children }: PageProp) {
	return <div className={styles.page_style}>{children}</div>;
}
