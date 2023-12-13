import styles from "./spiner.module.css";
export default function Spiner() {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.spinner} ${styles.center}`}>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
      </div>
    </div>
  );
}
