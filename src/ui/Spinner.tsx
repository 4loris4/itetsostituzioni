import styles from "./Spinner.module.scss";

export default function Spinner() {
  return (
    <div className={styles.spinner}>
      <svg>
        <circle cx="50%" cy="50%" r="45%" fill="none" strokeWidth="10%" strokeMiterlimit="10" />
      </svg>
    </div>
  );
}