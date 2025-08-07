import { useEffect, useState } from 'react';
import { fetchNotes, NoteMeta } from '../services/notionService';
import styles from '../styles/NotesSection.module.css';
import NoteCard from '../components/NoteCard';

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteMeta[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchNotes().then(setNotes).catch(console.error);
  }, []);

  const categories = Array.from(new Set(notes.map(n => n.category)));
  const summary = [
    { label: 'All', count: notes.length },
    ...categories.map(c => ({
      label: c,
      count: notes.filter(n => n.category === c).length
    }))
  ];

  const displayed = filter === 'All'
    ? notes
    : notes.filter(n => n.category === filter);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1>Notes &amp; Thoughts</h1>
        <p>Random thoughts, insights, and learnings from my journey as a developer.</p>
      </header>

      <div className={styles.summary}>
        {summary.map(s => (
          <div
            key={s.label}
            className={styles.summaryCard}
            onClick={()=>setFilter(s.label)}
            style={{ opacity: filter === s.label ? 1 : 0.6 }}
          >
            <div className={styles.count}>{s.count}</div>
            <div className={styles.label}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {displayed.map(n => (
          <NoteCard key={n.id} note={n} />
        ))}
      </div>
    </section>
  );
}
