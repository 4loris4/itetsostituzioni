import classNames from "classnames";
import styles from "./Button.module.scss";

type Props = JSX.IntrinsicElements["button"];

export default function Button({ className, ...props }: Props) {
  return (
    <button className={classNames(styles.button, className)} {...props} />
  );
}