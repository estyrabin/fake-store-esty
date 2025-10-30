import styles from './ConnectPage.module.css';

export default function ConnectPage() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.heading}>Connect Us</h1>
      <p className={styles.subheading}>We'd love to hear from you.</p>
      <div className={styles.contactBox}>
        <p className={styles.contactItem}>Email: store@store.com</p>
        <p className={styles.contactItem}>Phone:0532222222</p>
      </div>
    </div>
  );
}




