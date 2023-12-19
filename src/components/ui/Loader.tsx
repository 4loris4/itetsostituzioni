import styles from "./Loader.module.scss";
import Spinner from "./Spinner";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <Spinner />
    </div>
  );
}