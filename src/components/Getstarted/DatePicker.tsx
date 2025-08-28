import { useMemo, useRef, useState, useEffect } from "react";
import { addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, format } from "date-fns";
import styles from "../../styles/GetStarted.module.css";

type Props = {
  value?: string;               // "yyyy-MM-dd"
  onChange: (isoDate: string) => void;
  label?: string;
  name?: string;                // para el input hidden
  anchorClassName?: string;     // opcional: clase extra al input
};

export default function ThemedDatePicker({ value, onChange, label = "Fecha", name, anchorClassName }: Props) {
  const initial = value ? new Date(value) : new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(initial));
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | null>(value ? new Date(value) : null);

  const wrapRef = useRef<HTMLDivElement>(null);

  // cerrar al click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const weeks = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    const days: Date[][] = [];
    let cur = start;
    while (cur <= end) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(cur);
        cur = addDays(cur, 1);
      }
      days.push(week);
    }
    return days;
  }, [currentMonth]);

  function selectDay(d: Date) {
    setSelected(d);
    onChange(format(d, "yyyy-MM-dd"));
    setOpen(false);
  }

  return (
    <div className={styles.field} ref={wrapRef}>
      <label className={styles.fieldLabel}>{label}</label>

      <div className={styles.inputWrap}>
        {/* input visible solo para mostrar valor + abrir popover */}
        <input
          type="text"
          readOnly
          value={selected ? format(selected, "dd/MM/yyyy") : ""}
          placeholder="dd/mm/aaaa"
          onClick={() => setOpen((o) => !o)}
          className={`${styles.input} ${anchorClassName ?? ""}`}
        />
        {/* botón derecho (mismo que el de time) */}
        <button
          type="button"
          className={styles.pickerBtn}
          aria-label="Abrir calendario"
          onMouseDown={(e) => { e.preventDefault(); setOpen(true); }}
        />

        {/* input hidden para el form */}
        {name && (
          <input type="hidden" name={name} value={selected ? format(selected, "yyyy-MM-dd") : ""} />
        )}
      </div>

      {open && (
        <div className={styles.dpPopover} role="dialog" aria-label="Selector de fecha">
          <div className={styles.dpHeader}>
            <button type="button" className={styles.dpNav} onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>‹</button>
            <div className={styles.dpMonth}>{format(currentMonth, "MMMM yyyy")}</div>
            <button type="button" className={styles.dpNav} onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>›</button>
          </div>

          <div className={styles.dpWeekdays}>
            {["L", "M", "X", "J", "V", "S", "D"].map((d) => <span key={d}>{d}</span>)}
          </div>

          <div className={styles.dpGrid}>
            {weeks.map((week, wi) => (
              <div key={wi} className={styles.dpRow}>
                {week.map((day, di) => {
                  const disabled = !isSameMonth(day, currentMonth);
                  const isSel = selected && isSameDay(day, selected);
                  return (
                    <button
                      type="button"
                      key={di}
                      className={[
                        styles.dpCell,
                        disabled ? styles.dpCellMuted : "",
                        isSel ? styles.dpCellActive : ""
                      ].join(" ")}
                      onClick={() => selectDay(day)}
                      disabled={disabled}
                    >
                      {format(day, "d")}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
