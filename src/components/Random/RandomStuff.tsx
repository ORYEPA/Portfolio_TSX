import React from "react";
import styles from "../../styles/RandomStuff.module.css";
import { BookOpen, Palette, Music3 } from "lucide-react";

type Hobby = {
  title: string;
  blurb: string;
  desc: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  tone?: "blue" | "green" | "pink" | "violet" | "orange" | "teal";
  href?: string;            
  external?: boolean;      
  ariaLabel?: string;       
};

const HOBBIES: Hobby[] = [
  {
    title: "Reading",
    blurb: "Getting lost in different worlds through books",
    desc:
      "From sci-fi adventures to personal development, I love diving into stories that expand my mind and imagination.",
    Icon: BookOpen,
    tone: "blue",
    href: "https://fable.co/oryep-276236650829",     
    external: true,
    ariaLabel: "Open my reading tracker app",
  },
  {
    title: "Drawing",
    blurb: "Expressing creativity through art",
    desc:
      "Whether sketching ideas or detailed illustrations, drawing helps me visualize concepts and unwind.",
    Icon: Palette,
    tone: "green",
    href: "https://www.instagram.com/oryep_a/?igsh=bmFwcXB1NTRxbzVh",  
    external: true,
    ariaLabel: "Open my Instagram drawings gallery",
  },
  {
    title: "Playing Violin",
    blurb: "Creating beautiful melodies with strings",
    desc:
      "The violin lets me express emotions that words can’t capture, bringing harmony to both my mind and soul.",
    Icon: Music3,
    tone: "pink",
  },
];

export default function RandomStuff({ items = HOBBIES }: { items?: Hobby[] }) {
  return (
    <section className={styles.section} id="random">
      <div className={styles.header}>
        <h2 className={styles.title}>Random Stuff</h2>
        <p className={styles.subtitle}>
          Beyond coding, I find joy in these simple pleasures that keep my creativity flowing
          and my mind balanced.
        </p>
      </div>

      <div className={styles.grid}>
        {items.map((h) => {
          const CardInner = (
            <>
              <div className={styles.iconWrap}>
                <h.Icon className={styles.icon} aria-hidden />
              </div>
              <h3 className={styles.cardTitle}>{h.title}</h3>
              <p className={styles.blurb}>{h.blurb}</p>
              <div className={styles.desc}>{h.desc}</div>
            </>
          );

          const toneClass = styles[h.tone ?? "violet"];

          return h.href ? (
            <a
              key={h.title}
              className={`${styles.card} ${toneClass} ${styles.clickable}`}
              href={h.href}
              target={h.external ? "_blank" : undefined}
              rel={h.external ? "noopener noreferrer" : undefined}
              aria-label={h.ariaLabel ?? h.title}
            >
              {CardInner}
            </a>
          ) : (
            <article key={h.title} className={`${styles.card} ${toneClass}`}>
              {CardInner}
            </article>
          );
        })}
      </div>
    </section>
  );
}
