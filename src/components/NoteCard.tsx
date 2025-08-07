import { useNavigate } from 'react-router-dom';
import styles from '../styles/NotesSection.module.css';
import { NoteMeta } from '../services/notionService';

interface NoteCardProps {
  note: NoteMeta;
}

export default function NoteCard({ note }: NoteCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/notes/${note.slug}`)}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{note.title}</h3>
        <span className={styles.cardCategory}>{note.category}</span>
      </div>

      <p className={styles.cardExcerpt}>{note.excerpt}…</p>

      <div className={styles.cardFooter}>
        <time className={styles.cardDate}>{note.date}</time>
        <a
          className={styles.readMore}
          href={`/notes/${note.slug}`}
          onClick={e => e.stopPropagation()}
        >
          Read more →
        </a>
      </div>
    </div>
  );
}
