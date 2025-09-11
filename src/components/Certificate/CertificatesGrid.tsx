import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import CertificateCard from './CertificateCard';
import CertificatesSearchBar, { SearchState } from './SearchBar';

import { fetchCertificates, Certificate } from '../../services/certificates';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../styles/CertificatesGrid.module.css';

function normalize(s: string) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function matchesYear(c: Certificate, qNorm: string) {
  return normalize(c.year).startsWith(qNorm); 
}

function matchesSkill(c: Certificate, qNorm: string) {
  return (c.skills || []).some(t => normalize(t).includes(qNorm));
}

function matchesIssuer(c: Certificate, qNorm: string) {
  return normalize(c.issuer).includes(qNorm);
}

function matchesTitle(c: Certificate, qNorm: string) {
  return normalize(c.title).includes(qNorm);
}

function filterCerts(data: Certificate[], search: SearchState) {
  const qNorm = normalize(search.q.trim());
  if (!qNorm) return data;

  return data.filter(c => {
    switch (search.field) {
      case 'title':
        return matchesTitle(c, qNorm);
      case 'issuer':
        return matchesIssuer(c, qNorm);
      case 'year':
        return matchesYear(c, qNorm);
      case 'skill':
        return matchesSkill(c, qNorm);
      case 'all':
      default:
        return (
          matchesTitle(c, qNorm) ||
          matchesIssuer(c, qNorm) ||
          matchesYear(c, qNorm) ||
          matchesSkill(c, qNorm)
        );
    }
  });
}

function useQueryParams() {
  const nav = useNavigate();
  const loc = useLocation();

  const set = (params: Record<string, string | undefined>) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([k, v]) => {
      if (!v) url.searchParams.delete(k);
      else url.searchParams.set(k, v);
    });
    nav(`${url.pathname}?${url.searchParams.toString()}`, { replace: true });
  };

  const get = (key: string) => new URLSearchParams(loc.search).get(key) || undefined;
  return { set, get };
}

export default function CertificatesGrid({ limit = Infinity }: { limit?: number }) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  const { set: setQS, get } = useQueryParams();
  const [search, setSearch] = useState<SearchState>({
    q: get('q') || '',
    field: (get('field') as SearchState['field']) || 'all',
  });

  useEffect(() => {
    fetchCertificates().then(data => {
      const sorted = [...data].sort((a, b) => (b.year || '').localeCompare(a.year || ''));
      setCertificates(sorted);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setQS({
      q: search.q || undefined,
      field: search.field !== 'all' ? search.field : undefined,
    });
  }, [search.q, search.field]);

  const filtered = useMemo(() => filterCerts(certificates, search), [certificates, search]);
  const shown = filtered.slice(0, limit);

  if (loading) return <div>Loading…</div>;

  return (
    <section>
      <CertificatesSearchBar
        value={search}
        onChange={setSearch}
        onClear={() => setSearch({ q: '', field: 'all' })}
      />

      <div className={styles.metaRow}>
        <span>{filtered.length} results</span>
        {limit !== Infinity && filtered.length > limit && (
          <button
            className={styles.moreBtn}
            onClick={() => window.location.assign('/certificates')}
          >
            View all
          </button>
        )}
      </div>

      <div className={styles.grid}>
        {shown.map((c) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <CertificateCard {...c} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
