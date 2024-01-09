import { IconType } from "react-icons";
import styles from "./DetailsElement.module.scss";

type Props = {
  icon: IconType;
  title: string;
  trailing: string;
};

export default function DetailsElement({ icon: Icon, title, trailing }: Props) {
  return (
    <div className={styles.detailsElement}>
      <Icon />
      <span className={styles.title}>{title}</span>
      <span className={styles.trailing}>{trailing}</span>
    </div>
  );
}