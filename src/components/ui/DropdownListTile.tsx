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
  }[] | undefined;
  fallback?: {
    error?: boolean;
    label?: string;
    trailing?: React.ReactNode;
  };
};

export default function DropdownListTile<T extends string | number | undefined>({ label, placeholder, value, onChange, options, fallback, className, ...props }: Props<T>) {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value as T | undefined | "";
    if (value == undefined || value == "") return;
    onChange(value);
  };

  const isEmpty = (value == undefined || options?.filter(option => option.value == value).length == 0);

  return (
    <div className={styles.dropdownListTile}>
      <span>{label}</span>
      {options == undefined ? (
        <div className={styles.fallback}>
          <span className={classNames(styles.label, fallback?.error && styles.error)}>
            {fallback?.label}
          </span>
          {fallback?.trailing}
        </div>
      ) : (
        <select key={value} value={value} onChange={handleChange} className={classNames(isEmpty && styles.empty, className)} {...props}>
          {isEmpty &&
            <option hidden>{placeholder}</option>
          }
          {options.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
        </select>
      )}
    </div>
  );
}