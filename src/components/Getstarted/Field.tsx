import { useId, useRef } from "react";
import styles from "../../styles/GetStarted.module.css";

type Props = {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea";
  icon?: React.ReactNode;
  rows?: number;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export default function Field({
  label, name, type = "text", as = "input", icon, rows = 4, ...rest
}: Props) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const isPicker = type === "date" || type === "time";

  // Abrir picker SOLAMENTE en gesto de usuario
  const openPicker = (e?: React.SyntheticEvent) => {
    const el = inputRef.current as any;
    if (!el) return;

    // si viene de un synthetic event sin gesto real, no hacer nada
    if (e && "isTrusted" in (e.nativeEvent as any) && !(e.nativeEvent as any).isTrusted) {
      el.focus();
      return;
    }

    // aseguremos el foco y luego mostramos
    try {
      el.focus();
      // esperar al próximo frame mantiene el gesto como "user activation"
      requestAnimationFrame(() => {
        if (typeof el.showPicker === "function") el.showPicker();
      });
    } catch {
      // fallback
      el.focus();
    }
  };

  const InputTag: any = as === "textarea" ? "textarea" : "input";

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={id}>{label}</label>

      <div className={styles.inputWrap}>
        {icon && <span className={styles.inputIcon}>{icon}</span>}

        <InputTag
          id={id}
          name={name}
          type={as === "textarea" ? undefined : type}
          className={styles.input}
          ref={inputRef}
          // ⚠️ solo click, sin onFocus (evita el error)
          onClick={isPicker ? openPicker : undefined}
          {...rest}
          {...(as === "textarea" ? { rows } : {})}
        />

        {isPicker && (
          <button
            type="button"
            aria-label={type === "date" ? "Abrir calendario" : "Abrir selector de hora"}
            className={styles.pickerBtn}
            // usar mousedown mantiene la user activation antes del focus
            onMouseDown={(e) => { e.preventDefault(); openPicker(e); }}
          />
        )}
      </div>
    </div>
  );
}
