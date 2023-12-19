import styles from "./Header.module.scss";

type Props = {
  leading?: React.ReactNode,
  title: string,
  actions?: React.ReactNode;
};

export default function Header({ leading, title, actions }: Props) {
  return (
    <header className={styles.appBar}>
      {leading}
      <span className={styles.title}>{title}</span>
      {actions}
    </header>
  );
}