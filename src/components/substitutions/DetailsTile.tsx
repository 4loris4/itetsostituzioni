import classNames from "classnames";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import CollapsibleDiv from "../../ui/CollapsibleDiv";
import styles from "./DetailsTile.module.scss";

type Props = {
  title: string;
  subtitle?: string;
};

export default function DetailsTile({ title, subtitle }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={classNames(styles.detailsTile, expanded && styles.expanded)}>
      <button className={styles.tile} onClick={() => setExpanded(expanded => !expanded)}>
        <div className={styles.text}>
          <span>{title}</span>
          {subtitle &&
            <span>{subtitle}</span>
          }
        </div>
        <div className={styles.icon}>
          <MdKeyboardArrowDown />
        </div>
      </button>
      <CollapsibleDiv className={styles.content} collapsed={!expanded}> {/* //TODO details */}
        <p>asd1</p>
        <p>asd2</p>
        <p>asd3</p>
        <p>asd4</p>
        <p>asd5</p>
      </CollapsibleDiv>
    </div>
  );
}