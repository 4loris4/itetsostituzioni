import { DateTime } from "luxon";
import { MdSettings } from "react-icons/md";
import styles from "./Header.module.scss";
import IconButton from "./IconButton";

type Props = {
  date?: DateTime,
};

export default function Header({ date }: Props) {
  return (
    <header className={styles.appBar}>
      <span>{date?.setLocale("it").toFormat("'Sostituzioni di' cccc d LLLL") ?? "ITET Sostituzioni"}</span>
      <div className="actions">
        <IconButton icon={MdSettings} title="Impostazioni" />
      </div>
    </header>
  );
}