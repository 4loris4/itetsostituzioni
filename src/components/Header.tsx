import styles from "./Header.module.scss";

type Props = {
  leading?: React.ReactNode,
  title: string,
  actions?: React.ReactNode;
};

export default function Header({ leading, title, actions }: Props) {
  return (
    <header className={styles.appBar}>
      <div className={styles.title}>
        {leading}
        <span>{title}</span>
      </div>
      {actions &&
        <div className={styles.actions}>{actions}</div>
      }
    </header>
  );
}