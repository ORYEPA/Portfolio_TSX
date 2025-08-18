import styles from "../../styles/GetStarted.module.css";

type Option = { label: string; value: string };
export default function ChipToggle({
  name, value, onChange, options,
}: {
  name: string;
  value: string;
  onChange: (val: string) => void;
  options: Option[];
}) {
  return (
    <div className={styles.chips}>
      {options.map(o => (
        <button
          type="button"
          key={o.value}
          className={`${styles.chip} ${value === o.value ? styles.chipActive : ""}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
