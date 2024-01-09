import classNames from "classnames";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import CollapsibleDiv from "../ui/CollapsibleDiv";
import styles from "./DetailsTile.module.scss";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function DetailsTile({ title, subtitle, children }: Props) {
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
      <CollapsibleDiv className={styles.content} collapsed={!expanded}>
        {children}
      </CollapsibleDiv>
    </div>
  );
}