import { FikseModal, Page } from "../../Components";
import { OrgAccountForm } from "./OrgAccountForm";
import styles from "./Homepage.module.scss";
import { Toast } from "../../Components/Toast/Toast";
import { useToast } from "../../Context/ToastContext/ToastContext";

export function Homepage() {


  const { showToast } = useToast();
  
  return (
    <Page>

      <FikseModal
        className={styles.scale}
        modalHeader={<h2 className={styles.org_account_form_modal_header}>Create account</h2>}
        modalDescription={<p className={styles.org_account_form_modal_description}>Start your journey towards more repair and less work.</p>}
        modalContent={
          <div className={styles.modal_form_wrapper}>
            <OrgAccountForm />
          </div>
        }
      />

    </Page>
  );
}