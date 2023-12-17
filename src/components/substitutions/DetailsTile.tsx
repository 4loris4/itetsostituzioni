import styles from "./DetailsTile.module.scss";

type Props = {
  title: string;
  subtitle?: string;
};

//TODO expansionTile
export default function DetailsTile({ title, subtitle }: Props) {
  return (
    <div className={styles.detailsTile}>
      <span>{title}</span>
      {subtitle &&
        <span>{subtitle}</span>
      }
    </div>
  );
}