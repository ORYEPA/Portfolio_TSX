import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchNotes, fetchNoteContent } from '../services/notionService';
import styles from '../styles/NotePage.module.css';

export default function NotePage() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchNotes()
      .then(list => {
        const page = list.find(n => n.slug === slug);
        if (page) return fetchNoteContent(page.id);
      })
      .then(md => md && setContent(md))
      .catch(console.error);
  }, [slug]);

  return (
    <article className={styles.wrapper}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
