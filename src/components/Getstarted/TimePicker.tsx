import { useEffect, useRef, useState } from "react";
import styles from "../../styles/GetStarted.module.css";

type Props = {
  value?: string;            // "HH:mm"
  onChange: (hhmm: string) => void;
  label?: string;
  name?: string;             // para input hidden
  stepMinutes?: number;      // default 30
  startHour?: number;        // 8
  endHour?: number;          // 19
};

export default function ThemedTimePicker({
  value, onChange, label = "Hora", name, stepMinutes = 30, startHour = 8, endHour = 19,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const slots: string[] = [];
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }

  return (
    <div className={styles.field} ref={wrapRef}>
      <label className={styles.fieldLabel}>{label}</label>

      <div className={styles.inputWrap}>
        <input
          type="text"
          readOnly
          value={value || ""}
          placeholder="hh:mm"
          onClick={() => setOpen((o) => !o)}
          className={styles.input}
        />
        <button
          type="button"
          className={styles.pickerBtn}
          aria-label="Abrir selector de hora"
          onMouseDown={(e) => { e.preventDefault(); setOpen(true); }}
        />
        {name && <input type="hidden" name={name} value={value || ""} />}
      </div>

      {open && (
        <div className={styles.tpPopover} role="listbox" aria-label="Selector de hora">
          {slots.map((t) => (
            <button
              key={t}
              type="button"
              className={styles.tpItem}
              onClick={() => { onChange(t); setOpen(false); }}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
