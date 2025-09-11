import React from 'react';
import styles from '../../styles/SearchbarCertificate.module.css';

type Field = 'all' | 'title' | 'issuer' | 'year' | 'skill';

export type SearchState = {
  q: string;
  field: Field;
};

type Props = {
  value: SearchState;
  onChange: (v: SearchState) => void;
  onClear?: () => void;
};

export default function CertificatesSearchBar({ value, onChange, onClear }: Props) {
  const setQ = (q: string) => onChange({ ...value, q });
  const setField = (field: Field) => onChange({ ...value, field });

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <input
          className={styles.input}
          placeholder={
            value.field === 'year'
              ? 'Search by year (e.g. 2024)'
              : 'Search by title, issuer or skill'
          }
          value={value.q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className={styles.select}
          value={value.field}
          onChange={(e) => setField(e.target.value as Field)}
          title="Field"
        >
          <option value="all">All</option>
          <option value="title">Title</option>
          <option value="issuer">Issuer</option>
          <option value="year">Year</option>
          <option value="skill">Skill/Topic</option>
        </select>
        <button className={styles.clearBtn} onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
}
