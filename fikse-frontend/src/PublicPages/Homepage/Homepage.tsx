import { FikseModal, Page } from "../../Components";

export function Homepage() {
	return (
		<Page>
			<FikseModal 
			modalHeader={<h1>TEST MODAL</h1>}
			modalDescription={<p>Description description desc
				Description description desc
				Description description desc
				Description description desc
				Description description desc
				Description description desc
				Description description desc
				Description description desc
				Description description desc
				Description description desc
				Description description desc
				Description description desc
				Description description desc
				Description description desc
				Description description desc
			</p>}
			modalContent={
				<div>
					<div>CONTENT</div>
					<div>CONTENT</div>
					<div>CONTENT</div>
					<div>CONTENT</div>
				</div>
			}
			modalFooter={
				<div>
					<div>FOOTER</div>
					<div>FOOTER</div>
					<div>FOOTER</div>
					<div>FOOTER</div>
					<div>FOOTER</div>
					<div>FOOTER</div>
				</div>
			}
			/>
		</Page>
	);
}
