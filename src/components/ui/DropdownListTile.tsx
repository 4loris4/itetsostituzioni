import classNames from "classnames";
import styles from "./DropdownListTile.module.scss";

type Props<T extends string | number | undefined> = Omit<JSX.IntrinsicElements["select"], "value" | "onChange"> & {
  label: string;
  placeholder?: string;
  value: T | undefined,
  onChange: (value: T) => void;
  options: {
    value: T;
    label: string;
  }[];
};

export default function DropdownListTile<T extends string | number | undefined>({ label, placeholder, value, onChange, options, className, ...props }: Props<T>) {
  return (
    <div className={styles.dropdownListTile}>
      <span>{label}</span>
      <select key={value} value={value} onChange={(e) => onChange(e.target.value as T)} className={classNames(value == undefined && styles.empty, className)} {...props}>
        <option hidden>{placeholder}</option>
        {options.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
      </select>
    </div>
  );
}