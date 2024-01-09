import classNames from "classnames";
import { IconType } from "react-icons";
import styles from "./IconButton.module.scss";

type Props = JSX.IntrinsicElements["button"] & {
  icon: IconType;
  title: string;
};

export default function IconButton({ icon: Icon, className, ...props }: Props) {
  return (
    <button className={classNames(styles.iconButton, className)} {...props}>
      <Icon />
    </button>
  );
}