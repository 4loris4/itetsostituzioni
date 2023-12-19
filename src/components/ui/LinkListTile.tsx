import { MdOpenInNew } from "react-icons/md";
import styles from "./LinkListTile.module.scss";

type Props = {
  label: string;
  href: string;
};

export default function LinkListTile({ label, href }: Props) {
  return (
    <a className={styles.linkListTile} href={href} target="_blank">
      <span>{label}</span>
      <MdOpenInNew />
    </a>
  );
}