import { Clock, UserRoundCheck, BadgeCheck } from "lucide-react";
import styles from "../../styles/GetStarted.module.css";

export default function FeatureStrip() {
  const items = [
    { Icon: Clock, title: "Respuesta Rápida", desc: "Te contactamos en menos de 2 horas hábiles" },
    { Icon: UserRoundCheck, title: "Consulta Personalizada", desc: "Solución adaptada a tus necesidades" },
    { Icon: BadgeCheck, title: "Sin Compromiso", desc: "Primera consulta gratuita" },
  ];
  return (
    <div className={styles.strip}>
      {items.map((i) => (
        <div key={i.title} className={styles.stripItem}>
          <i.Icon className={styles.stripIcon} />
          <div>
            <div className={styles.stripTitle}>{i.title}</div>
            <div className={styles.stripDesc}>{i.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
