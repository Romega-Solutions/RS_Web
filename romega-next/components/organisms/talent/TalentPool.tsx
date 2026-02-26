'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import TalentCard from './TalentCard';
import styles from './TalentPool.module.css';
import type { Talent } from '@/types/jobs';

interface TalentPoolProps {
  talents: Talent[];
}

const SPECIALIZATIONS = [
  'AI Developer', 'AI/ML Engineer', 'Account Manager',
  'Designers', 'Developers', 'Virtual Assistant', 'Sales Experts',
];

const SENIORITY_LEVELS = ['Expert', 'Junior', 'Middle', 'Senior'];


const PAGE_SIZE = 6;

export default function TalentPool({ talents }: TalentPoolProps) {
  const [search, setSearch] = useState('');
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [selectedSeniority, setSelectedSeniority] = useState<string[]>([]);
  const [selectedRates, setSelectedRates] = useState<string[]>([]);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    roles: true, skills: true, location: true,
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeFilterCount = selectedSpecs.length + selectedSeniority.length + selectedRates.length;

  const toggleSpec = (spec: string) =>
    setSelectedSpecs(prev => prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]);
  const toggleSeniority = (s: string) =>
    setSelectedSeniority(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleRate = (r: string) =>
    setSelectedRates(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
  const toggleSection = (key: string) =>
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const filtered = talents.filter(t => {
    if (search) {
      const q = search.toLowerCase();
      if (
        !t.name.toLowerCase().includes(q) &&
        !t.role.toLowerCase().includes(q) &&
        !t.skills.some(s => s.toLowerCase().includes(q))
      ) return false;
    }
    if (selectedSpecs.length > 0) {
      const match = selectedSpecs.some(s =>
        t.category?.toLowerCase().includes(s.toLowerCase()) ||
        t.role?.toLowerCase().includes(s.toLowerCase())
      );
      if (!match) return false;
    }
    if (selectedSeniority.length > 0) {
      const level = (t.experience_level || '').toLowerCase();
      const match = selectedSeniority.some(s => level.includes(s.toLowerCase()) || (s === 'Middle' && level.includes('mid')));
      if (!match) return false;
    }
    return true;
  });

  const visible = filtered.slice(0, visibleCount);

  return (
    <section className={styles['talent-pool']} aria-label="Talent Pool">
      <div className={styles['talent-pool__layout']}>

        {/* Mobile filter toggle button */}
        <div className={styles['talent-pool__mobile-filter-bar']}>
          <button
            className={styles['talent-pool__filter-toggle']}
            onClick={() => setMobileFiltersOpen(true)}
            aria-expanded={mobileFiltersOpen}
          >
            <SlidersHorizontal size={16} />
            Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
          </button>
          <span className={styles['talent-pool__count-badge-mobile']}>
            {filtered.length} talents
          </span>
        </div>

        {/* Mobile filter overlay */}
        {mobileFiltersOpen && (
          <div
            className={styles['talent-pool__overlay']}
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* ── SIDEBAR ── */}
        <aside
          className={`${styles['talent-pool__sidebar']} ${mobileFiltersOpen ? styles['talent-pool__sidebar--open'] : ''}`}
          aria-label="Filters"
        >
          {/* Mobile close button */}
          <button
            className={styles['sidebar__close-btn']}
            onClick={() => setMobileFiltersOpen(false)}
            aria-label="Close filters"
          >
            <X size={18} />
          </button>

          {/* Specialization */}
          <div className={styles['sidebar__section']}>
            <h3 className={styles['sidebar__heading']}>Specialization</h3>
            <div className={styles['sidebar__pills']}>
              {SPECIALIZATIONS.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSpec(s)}
                  className={`${styles['sidebar__pill']} ${selectedSpecs.includes(s) ? styles['sidebar__pill--active'] : ''}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Seniority */}
          <div className={styles['sidebar__section']}>
            <h3 className={styles['sidebar__heading']}>Seniority</h3>
            {SENIORITY_LEVELS.map(s => (
              <label key={s} className={styles['sidebar__checkbox-row']}>
                <input
                  type="checkbox"
                  checked={selectedSeniority.includes(s)}
                  onChange={() => toggleSeniority(s)}
                  className={styles['sidebar__checkbox']}
                />
                <span>{s}</span>
              </label>
            ))}
          </div>


          {/* Collapsible: Roles */}
          {(['roles', 'skills', 'location'] as const).map(key => (
            <div key={key} className={styles['sidebar__section']}>
              <button
                className={styles['sidebar__collapsible']}
                onClick={() => toggleSection(key)}
                aria-expanded={!collapsedSections[key]}
              >
                <span className={styles['sidebar__heading']} style={{ margin: 0 }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                {collapsedSections[key]
                  ? <ChevronDown size={16} />
                  : <ChevronUp size={16} />
                }
              </button>
            </div>
          ))}
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className={styles['talent-pool__main']}>

          {/* Search bar */}
          <div className={styles['talent-pool__search-row']}>
            <div className={styles['talent-pool__search-wrap']}>
              <Search size={16} className={styles['talent-pool__search-icon']} aria-hidden="true" />
              <input
                type="search"
                placeholder="Search by role, skill or keyword..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={styles['talent-pool__search-input']}
                aria-label="Search talent"
              />
            </div>
            <span className={styles['talent-pool__count-badge']}>
              Available talents: {filtered.length}
            </span>
          </div>

          {/* Grid */}
          {visible.length > 0 ? (
            <div className={styles['talent-pool__grid']}>
              {visible.map(talent => (
                <TalentCard key={talent.id} talent={talent} />
              ))}
            </div>
          ) : (
            <div className={styles['talent-pool__empty']}>
              No talent found matching your filters.
            </div>
          )}

          {/* Load More */}
          {visibleCount < filtered.length && (
            <div className={styles['talent-pool__load-more-wrap']}>
              <button
                className={styles['talent-pool__load-more']}
                onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
              >
                Load More Talents
                <ChevronDown size={18} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

