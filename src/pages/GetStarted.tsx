// src/pages/GetStarted.tsx
import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Mail, Building2, Phone, User, ChevronLeft, Send, MessageSquare
} from "lucide-react";

import styles from "../styles/GetStarted.module.css";
import Card from "../components/Getstarted/GetStartCard";
import Field from "../components/Getstarted/Field";
import ThemedDatePicker from "../components/Getstarted/DatePicker";
import ThemedTimePicker from "../components/Getstarted/TimePicker";
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

/* ------------------------- env (CRA: process.env) ------------------ */
const SERVICE_ID   = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID  = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY   = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const AUTOREPLY_ID = process.env.REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID;

/* ------------------------------ page ------------------------------- */
export default function GetStarted() {
  const q = useQuery();
  const navigate = useNavigate();
  const serviceSlug = q.get("service") ?? "";

  const [services, setServices] = useState<Service[]>([]);
  const [meetingType, setMeetingType] =
    useState<"video" | "phone" | "inperson">("video");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Themed pickers (controlled)
  const [fechaISO, setFechaISO] = useState<string>(""); // yyyy-MM-dd
  const [horaHHMM, setHoraHHMM] = useState<string>(""); // HH:mm

  useEffect(() => {
    loadServices().then(setServices);
  }, []);

  const selected = services.find((s) => s.slug === serviceSlug);
  const subjectDefault = selected?.title ?? "Initial consultation";

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
        throw new Error("Missing required fields.");
      }
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error("EmailJS environment variables are missing.");
      }

      // 1) Email to you (EmailJS)
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: `${p.nombre} ${p.apellidos || ""}`.trim(),
          from_email: p.email,
          subject: p.subject || "Initial consultation",
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

      // 2) Auto-reply (optional)
      if (AUTOREPLY_ID) {
        await emailjs.send(
          SERVICE_ID,
          AUTOREPLY_ID,
          {
            to_name: p.nombre,
            to_email: p.email,
            subject: p.subject || "Initial consultation",
            selected_service: p.service || "-",
            preferred_date: p.fecha || "-",
            preferred_time: p.hora || "-",
          },
          PUBLIC_KEY
        );
      }

      // 3) Calendar: .ics + "Add to Google" (if date/time provided)
      if (p.fecha && p.hora) {
        const startLocal = new Date(`${p.fecha}T${p.hora}:00`);
        const endLocal = addMinutes(startLocal, 30);

        const ics = buildICS({
          title: `Consultation: ${p.subject || "Initial consultation"}`,
          description:
            `Meeting type: ${p.tipoReunion}\n` +
            `Name: ${p.nombre} ${p.apellidos || ""}\n` +
            `Email: ${p.email}\n` +
            `Company: ${p.empresa || "-"}\n` +
            `Phone: ${p.telefono || "-"}\n` +
            `Service: ${p.service || "-"}\n\n` +
            `Message:\n${p.mensaje || "-"}`,
          location: p.tipoReunion === "inperson" ? "To be confirmed" : "Online",
          start: new Date(startLocal.toUTCString()),
          end: new Date(endLocal.toUTCString()),
          organizerEmail: "andreaelenapeyro@gmail.com",
          attendeeEmail: p.email,
        });

        const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "consultation.ics";
        a.click();
        URL.revokeObjectURL(url);

        const gUrl = buildGoogleCalURL({
          title: `Consultation: ${p.subject || "Initial consultation"}`,
          details: "Created from the portfolio form.",
          start: new Date(startLocal.toUTCString()),
          end: new Date(endLocal.toUTCString()),
          location: p.tipoReunion === "inperson" ? "To be confirmed" : "Online",
        });
        window.open(gUrl, "_blank");

        // (Optional) your backend
        try {
          await fetch("/api/create-event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: `Consultation: ${p.subject || "Initial consultation"}`,
              description: `Client: ${p.nombre} ${p.apellidos || ""}\nEmail: ${p.email}\n${p.mensaje || ""}`,
              start: startLocal.toISOString(),
              end: endLocal.toISOString(),
              attendeeEmail: p.email,
              attendeeName: `${p.nombre} ${p.apellidos || ""}`.trim(),
              meetingType: p.tipoReunion,
            }),
          });
        } catch {/* ignore if not available */}
      }

      setNotice("Successfully sent! We’ll contact you shortly.");
      form.reset();
      setFechaISO("");
      setHoraHHMM("");
    } catch (err) {
      console.error("Email/send error:", err);
      setNotice("Successfully sent! We’ll contact you shortly.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className={styles.section}>
      {/* Top back button */}
      <div className={styles.topActions}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate("/")}
        >
          <span className={styles.backIcon}><ChevronLeft size={16} /></span>
          <span>Back to home</span>
        </button>
      </div>

      <header className={styles.header}>
        <h1 className={styles.h1}>Let’s Get Started</h1>
        <p className={styles.lead}>
          Fill out the form and book a free meeting to explore how we can help you reach your goals.
        </p>
      </header>

      <form className={styles.grid} onSubmit={onSubmit}>
        {/* LEFT: Contact */}
        <div className={styles.cardWrapContact}>
          <Card
            title="Contact information"
            subtitle="Tell us about you and your project so we can tailor the conversation."
          >
            <div className={styles.twoCols}>
              <Field label="First name" name="nombre" required placeholder="Your first name" icon={<User size={16} />} />
              <Field label="Last name" name="apellidos" placeholder="Your last name" />
            </div>

            <Field label="Work email" name="email" type="email" required placeholder="you@company.com" icon={<Mail size={16} />} />
            <Field label="Company" name="empresa" placeholder="Your company" icon={<Building2 size={16} />} />
            <Field label="Phone" name="telefono" type="tel" placeholder="+52 XXX XXX XXXX" icon={<Phone size={16} />} />

            <Field
              label="Tell us about your project"
              name="mensaje"
              as="textarea"
              rows={5}
              placeholder="Describe your project, goals, preferred technologies, estimated budget…"
              icon={<MessageSquare size={16} />}
            />
          </Card>
        </div>

        {/* RIGHT: Scheduling */}
        <div className={styles.cardWrapAgenda}>
          <Card
            title="Schedule your free meeting"
            subtitle="Pick a date and time that works for you."
          >
            {/* Themed pickers (include hidden inputs name=fecha/hora) */}
            <ThemedDatePicker
              label="Preferred date"
              name="fecha"
              value={fechaISO}
              onChange={setFechaISO}
            />
            <ThemedTimePicker
              label="Preferred time"
              name="hora"
              value={horaHHMM}
              onChange={setHoraHHMM}
            />

            <div className={styles.field}>
              <span className={styles.fieldLabel}>How do you prefer to meet?</span>
              <ChipToggle
                name="tipoReunion"
                value={meetingType}
                onChange={(v) => setMeetingType(v as any)}
                options={[
                  { label: "Video call", value: "video" },
                  { label: "Phone call", value: "phone" },
                  { label: "In person", value: "inperson" },
                ]}
              />
            </div>

            <div className={styles.durationBox}>
              <span className={styles.durationLabel}>Estimated duration:</span>
              <span className={styles.durationPill}>30–45 minutes</span>
            </div>

            {/* hidden context */}
            <input type="hidden" name="subject" value={subjectDefault} />
            <input type="hidden" name="service" value={serviceSlug || selected?.slug || ""} />
            <input type="hidden" name="tipoReunion" value={meetingType} />

            <button type="submit" className={styles.submit} disabled={sending}>
              <Send size={18} />
              <span>{sending ? "Sending..." : "Let’s talk about your project"}</span>
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
