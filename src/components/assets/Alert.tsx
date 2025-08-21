import { X, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import styles from "./Alert.module.css";

export function Alert({
  type = "info",
  children,
  onClose,
}: {
  type?: "success" | "error" | "info";
  children: React.ReactNode;
  onClose?: () => void;
}) {
  const Icon = type === "success" ? CheckCircle2 : type === "error" ? AlertTriangle : Info;
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <span className={styles.icon}><Icon size={18} /></span>
      <span className={styles.text}>{children}</span>
      <button className={styles.close} onClick={onClose} aria-label="Cerrar">
        <X size={16} />
      </button>
    </div>
  );
}
