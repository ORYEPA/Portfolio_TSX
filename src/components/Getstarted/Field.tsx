import { ReactNode } from "react";
import styles from "../../styles/GetStarted.module.css";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  required?: boolean;
  as?: "input" | "textarea";
  rows?: number;
};

export default function Field({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  required,
  as = "input",
  rows = 4,
}: Props) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={styles.inputWrap}>
        {icon && <span className={styles.inputIcon}>{icon}</span>}
        {as === "textarea" ? (
          <textarea
            name={name}
            rows={rows}
            placeholder={placeholder}
            className={styles.input}
            required={required}
          />
        ) : (
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            className={styles.input}
            required={required}
          />
        )}
      </div>
    </label>
  );
}
