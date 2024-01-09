import classNames from "classnames";
import styles from "./FullscreenDetails.module.scss";

type Props = {
  title: string;
  subtitle?: string;
  isError?: boolean;
};

export default function FullscreenDetails({ title, subtitle, isError = false }: Props) {
  return (
    <div className={classNames(styles.details, isError && styles.error)}>
      <span className={styles.title}>{title}</span>
      {subtitle &&
        <span>{subtitle}</span>
      }
    </div>
  );
}