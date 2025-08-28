// src/pages/GetStarted.tsx
import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Mail, Building2, Phone, User, ChevronLeft, Send,
  Calendar as CalendarIcon, Clock as ClockIcon, MessageSquare
} from "lucide-react";

import styles from "../styles/GetStarted.module.css";
import Card from "../components/Getstarted/GetStartCard";
import Field from "../components/Getstarted/Field";
import ChipToggle from "../components/Getstarted/ChipToggle";
import FeatureStrip from "../components/Getstarted/FeatureStrip";

import emailjs from "@emailjs/browser";
import { format, addMinutes } from "date-fns";
import { loadServices, type Service } from "../services/loadServices";

/* ----------------------------- helpers ----------------------------- */
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function toUtcStamp(d: Date) {
  return format(d, "yyyyMMdd'T'HHmmss'Z'");
}

function buildGoogleCalURL({
  title, details, start, end, location,
}: {
  title: string; details: string; start: Date; end: Date; location?: string;
}) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details,
    location: location || "",
    dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildICS({
  title, description, start, end, location, organizerEmail, attendeeEmail,
}: {
  title: string; description: string; start: Date; end: Date;
  location?: string; organizerEmail: string; attendeeEmail: string;
}) {
  const dtStart = format(start, "yyyyMMdd'T'HHmmss'Z'");
  const dtEnd = format(end, "yyyyMMdd'T'HHmmss'Z'");
  const uid = `${Date.now()}@portfolio`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Portfolio//GetStarted//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStart}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    `LOCATION:${(location || "").replace(/\n/g, "\\n")}`,
    `ORGANIZER;CN=Andrea Peyro:mailto:${organizerEmail}`,
    `ATTENDEE;CN=Client;RSVP=TRUE:mailto:${attendeeEmail}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

const SERVICE_ID   = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID  = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY   = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const AUTOREPLY_ID = process.env.REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID;

export default function GetStarted() {
  const q = useQuery();
  const navigate = useNavigate();
  const serviceSlug = q.get("service") ?? "";

  const [services, setServices] = useState<Service[]>([]);
  const [meetingType, setMeetingType] = useState<"video" | "phone" | "inperson">("video");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    loadServices().then(setServices);
  }, []);

  const selected = services.find((s) => s.slug === serviceSlug);
  const subjectDefault = selected?.title ?? "Primera consulta";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (sending) return;

  setSending(true);
  setNotice(null);

  const form = e.currentTarget;
  const data = new FormData(form);
  const p = Object.fromEntries(data.entries()) as Record<string, string>;

  try {
    if (!p.email || !p.nombre) {
      throw new Error("Faltan campos obligatorios.");
    }
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      throw new Error("Faltan variables de entorno de EmailJS.");
    }

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: `${p.nombre} ${p.apellidos || ""}`.trim(),
        from_email: p.email,
        subject: p.subject || "Primera consulta",
        company: p.empresa || "-",
        phone: p.telefono || "-",
        message: p.mensaje || "-",
        preferred_date: p.fecha || "-",
        preferred_time: p.hora || "-",
        selected_service: p.service || "-",
        tipoReunion: p.tipoReunion || "video",
      },
      PUBLIC_KEY
    );

    if (AUTOREPLY_ID) {
      await emailjs.send(
        SERVICE_ID,
        AUTOREPLY_ID,
        {
          to_name: p.nombre,
          to_email: p.email,
          subject: p.subject || "Primera consulta",
          selected_service: p.service || "-",
          preferred_date: p.fecha || "-",
          preferred_time: p.hora || "-",
        },
        PUBLIC_KEY
      );
    }

    if (p.fecha && p.hora) {
      const startLocal = new Date(`${p.fecha}T${p.hora}:00`);
      const endLocal = addMinutes(startLocal, 30);

      const ics = buildICS({
        title: `Consulta: ${p.subject || "Primera consulta"}`,
        description:
          `Tipo: ${p.tipoReunion}\n` +
          `Nombre: ${p.nombre} ${p.apellidos || ""}\n` +
          `Email: ${p.email}\n` +
          `Empresa: ${p.empresa || "-"}\n` +
          `Teléfono: ${p.telefono || "-"}\n` +
          `Servicio: ${p.service || "-"}\n\n` +
          `Mensaje:\n${p.mensaje || "-"}`,
        location: p.tipoReunion === "inperson" ? "Por confirmar" : "Online",
        start: new Date(startLocal.toUTCString()),
        end: new Date(endLocal.toUTCString()),
        organizerEmail: "andreaelenapeyro@gmail.com",
        attendeeEmail: p.email,
      });

      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "consulta.ics";
      a.click();
      URL.revokeObjectURL(url);

      const gUrl = buildGoogleCalURL({
        title: `Consulta: ${p.subject || "Primera consulta"}`,
        details: "Creado desde el formulario del portfolio.",
        start: new Date(startLocal.toUTCString()),
        end: new Date(endLocal.toUTCString()),
        location: p.tipoReunion === "inperson" ? "Por confirmar" : "Online",
      });
      window.open(gUrl, "_blank");

      try {
        await fetch("/api/create-event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: `Consulta: ${p.subject || "Primera consulta"}`,
            description: `Cliente: ${p.nombre} ${p.apellidos || ""}\nCorreo: ${p.email}\n${p.mensaje || ""}`,
            start: startLocal.toISOString(),
            end: endLocal.toISOString(),
            attendeeEmail: p.email,
            attendeeName: `${p.nombre} ${p.apellidos || ""}`.trim(),
            meetingType: p.tipoReunion,
          }),
        });
      } catch {/* ignora si no existe */}
    }

    setNotice("Successfully sent! We’ll contact you shortly.");
    form.reset();
  } catch (err) {
    console.error("Email/send error:", err);
    setNotice("Successfully sent! We’ll contact you shortly.");
  } finally {
    setSending(false);
  }
}



  return (
    <section className={styles.section}>
      {/* Botón superior volver */}
      <div className={styles.topActions}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate("/")}
        >
          <span className={styles.backIcon}><ChevronLeft size={16} /></span>
          <span>Volver al inicio</span>
        </button>
      </div>

      <header className={styles.header}>
        <h1 className={styles.h1}>Comencemos Juntos</h1>
        <p className={styles.lead}>
          Completa el formulario y agenda una reunión gratuita para conocer cómo podemos ayudarte a alcanzar tus objetivos.
        </p>
      </header>

      <form className={styles.grid} onSubmit={onSubmit}>
        {/* IZQUIERDA: Contacto */}
        <div className={styles.cardWrapContact}>
          <Card
            title="Información de Contacto"
            subtitle="Cuéntanos sobre ti y tu proyecto para personalizar nuestra conversación."
          >
            <div className={styles.twoCols}>
              <Field label="Nombre" name="nombre" required placeholder="Tu nombre" icon={<User size={16} />} />
              <Field label="Apellidos" name="apellidos" placeholder="Tus apellidos" />
            </div>

            <Field label="Email Corporativo" name="email" type="email" required placeholder="tu.email@empresa.com" icon={<Mail size={16} />} />
            <Field label="Empresa" name="empresa" placeholder="Nombre de tu empresa" icon={<Building2 size={16} />} />
            <Field label="Teléfono" name="telefono" type="tel" placeholder="+52 XXX XXX XXXX" icon={<Phone size={16} />} />

            <Field
              label="Cuéntanos sobre tu proyecto"
              name="mensaje"
              as="textarea"
              rows={5}
              placeholder="Describe tu proyecto, objetivos, tecnologías que prefieres, presupuesto estimado…"
              icon={<MessageSquare size={16} />}
            />
          </Card>
        </div>

        {/* DERECHA: Agenda */}
        <div className={styles.cardWrapAgenda}>
          <Card
            title="Agenda tu Reunión Gratuita"
            subtitle="Selecciona cuándo quieres que hablemos sobre tu proyecto."
          >
            <Field label="Fecha Preferida" name="fecha" type="date" icon={<CalendarIcon size={16} />} />
            <Field label="Hora Preferida" name="hora" type="time" icon={<ClockIcon size={16} />} />

            <div className={styles.field}>
              <span className={styles.fieldLabel}>¿Cómo prefieres que hablemos?</span>
              <ChipToggle
                name="tipoReunion"
                value={meetingType}
                onChange={(v) => setMeetingType(v as any)}
                options={[
                  { label: "Videollamada", value: "video" },
                  { label: "Llamada", value: "phone" },
                  { label: "Presencial", value: "inperson" },
                ]}
              />
            </div>

            {/* Caja de duración estilo lila */}
            <div className={styles.durationBox}>
              <span className={styles.durationLabel}>Duración estimada:</span>
              <span className={styles.durationPill}>30–45 minutos</span>
            </div>

            {/* contexto oculto */}
            <input type="hidden" name="subject" value={subjectDefault} />
            <input type="hidden" name="service" value={serviceSlug || selected?.slug || ""} />
            <input type="hidden" name="tipoReunion" value={meetingType} />

            <button type="submit" className={styles.submit} disabled={sending}>
              <Send size={18} />
              <span>{sending ? "Enviando..." : "¡Hablemos de tu Proyecto!"}</span>
            </button>
            {notice && (
              <div className={styles.noticeSuccess} role="status" aria-live="polite">
                <span className={styles.noticeIcon}>✔</span>
                <span>{notice}</span>
              </div>
            )}

          </Card>
        </div>
      </form>

      <FeatureStrip />
    </section>
  );
}
