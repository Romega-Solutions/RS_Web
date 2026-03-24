'use client';

import { useEffect, useState } from 'react';
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
  const MAX_SELECTIONS_PER_GROUP = 8;
  const OPTION_PREVIEW_COUNT = 12;

  const [search, setSearch] = useState('');
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [selectedSeniority, setSelectedSeniority] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [roleQuery, setRoleQuery] = useState('');
  const [skillQuery, setSkillQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showAllOptions, setShowAllOptions] = useState<Record<string, boolean>>({
    roles: false,
    skills: false,
    location: false,
  });
  const [guardrailMessage, setGuardrailMessage] = useState('');
  
  // Check if database is completely empty (no initial talents)
  const isDatabaseEmpty = talents.length === 0;
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    roles: true, skills: true, location: true,
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Helper function to build and filter option lists
  const getOptionsList = (items: string[], query: string): string[] => {
    const filtered = query.trim()
      ? items.filter(item => item.toLowerCase().includes(query.trim().toLowerCase()))
      : items;
    return filtered;
  };

  // Build base lists (simple, cheap operations—no memo needed)
  const baseRolesList = Array.from(new Set(talents.map(t => t.role).filter(Boolean))).sort();
  const baseSkillsList = Array.from(new Set(talents.flatMap(t => t.skills ?? []).map(s => s.trim()).filter(Boolean))).sort();
  const baseLocationsList = Array.from(new Set(talents.map(t => t.location).filter(Boolean))).sort();

  // Apply query filters
  const filteredRoleOptions = getOptionsList(baseRolesList, roleQuery);
  const filteredSkillOptions = getOptionsList(baseSkillsList, skillQuery);
  const filteredLocationOptions = getOptionsList(baseLocationsList, locationQuery);

  // Apply display limits
  const displayedRoleOptions = showAllOptions.roles
    ? filteredRoleOptions
    : filteredRoleOptions.slice(0, OPTION_PREVIEW_COUNT);
  const displayedSkillOptions = showAllOptions.skills
    ? filteredSkillOptions
    : filteredSkillOptions.slice(0, OPTION_PREVIEW_COUNT);
  const displayedLocationOptions = showAllOptions.location
    ? filteredLocationOptions
    : filteredLocationOptions.slice(0, OPTION_PREVIEW_COUNT);

  const activeFilterCount =
    selectedSpecs.length +
    selectedSeniority.length +
    selectedRoles.length +
    selectedSkills.length +
    selectedLocations.length;

  const toggleWithLimit = (current: string[], value: string, setter: (next: string[]) => void) => {
    if (current.includes(value)) {
      setter(current.filter(item => item !== value));
      return;
    }

    if (current.length >= MAX_SELECTIONS_PER_GROUP) {
      setGuardrailMessage(`You can select up to ${MAX_SELECTIONS_PER_GROUP} options per filter group.`);
      return;
    }

    setter([...current, value]);
  };

  const toggleSpec = (spec: string) => toggleWithLimit(selectedSpecs, spec, setSelectedSpecs);
  const toggleSeniority = (value: string) => toggleWithLimit(selectedSeniority, value, setSelectedSeniority);
  const toggleRole = (role: string) => toggleWithLimit(selectedRoles, role, setSelectedRoles);
  const toggleSkill = (skill: string) => toggleWithLimit(selectedSkills, skill, setSelectedSkills);
  const toggleLocation = (location: string) => toggleWithLimit(selectedLocations, location, setSelectedLocations);
  const toggleSection = (key: string) =>
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const clearAllFilters = () => {
    setSearch('');
    setSelectedSpecs([]);
    setSelectedSeniority([]);
    setSelectedRoles([]);
    setSelectedSkills([]);
    setSelectedLocations([]);
    setRoleQuery('');
    setSkillQuery('');
    setLocationQuery('');
    setShowAllOptions({ roles: false, skills: false, location: false });
    setGuardrailMessage('');
    setVisibleCount(PAGE_SIZE);
  };

  useEffect(() => {
    if (!guardrailMessage) return;
    const timer = setTimeout(() => setGuardrailMessage(''), 2800);
    return () => clearTimeout(timer);
  }, [guardrailMessage]);

  useEffect(() => {
    if (!mobileFiltersOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileFiltersOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileFiltersOpen]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [
    search,
    selectedSpecs,
    selectedSeniority,
    selectedRoles,
    selectedSkills,
    selectedLocations,
  ]);

  const filtered = talents.filter(t => {
    const role = (t.role || '').toLowerCase();
    const location = (t.location || '').toLowerCase();
    const category = (t.category || '').toLowerCase();
    const tagline = (t.tagline || '').toLowerCase();
    const subcategories = t.subcategories?.map(item => item.toLowerCase()) ?? [];

    if (search) {
      const q = search.toLowerCase();
      if (
        !t.name.toLowerCase().includes(q) &&
        !role.includes(q) &&
        !location.includes(q) &&
        !category.includes(q) &&
        !tagline.includes(q) &&
        !t.skills.some(s => s.toLowerCase().includes(q)) &&
        !subcategories.some(item => item.includes(q))
      ) return false;
    }

    if (selectedSpecs.length > 0) {
      const match = selectedSpecs.some(s =>
        category.includes(s.toLowerCase()) ||
        role.includes(s.toLowerCase())
      );
      if (!match) return false;
    }

    if (selectedSeniority.length > 0) {
      const level = (t.experience_level || '').toLowerCase();
      const match = selectedSeniority.some(s => level.includes(s.toLowerCase()) || (s === 'Middle' && level.includes('mid')));
      if (!match) return false;
    }

    if (selectedRoles.length > 0) {
      const selectedRoleSet = new Set(selectedRoles.map(item => item.toLowerCase()));
      if (!selectedRoleSet.has(role)) return false;
    }

    if (selectedSkills.length > 0) {
      const talentSkills = new Set(t.skills.map(item => item.toLowerCase()));
      const hasSkillMatch = selectedSkills.some(skill => talentSkills.has(skill.toLowerCase()));
      if (!hasSkillMatch) return false;
    }

    if (selectedLocations.length > 0) {
      const selectedLocationSet = new Set(selectedLocations.map(item => item.toLowerCase()));
      if (!selectedLocationSet.has(location)) return false;
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

          {(activeFilterCount > 0 || search.trim().length > 0) && (
            <div className={styles['sidebar__section']}>
              <button
                className={styles['talent-pool__clear-filters']}
                onClick={clearAllFilters}
                type="button"
              >
                Clear all filters
              </button>
            </div>
          )}

          {guardrailMessage && (
            <div className={styles['sidebar__section']}>
              <p className={styles['sidebar__guardrail']} role="status" aria-live="polite">
                {guardrailMessage}
              </p>
            </div>
          )}

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


          {/* Roles */}
          <div className={styles['sidebar__section']}>
            <button
              className={styles['sidebar__collapsible']}
              onClick={() => toggleSection('roles')}
              aria-expanded={!collapsedSections.roles}
            >
              <span className={styles['sidebar__heading']} style={{ margin: 0 }}>
                Roles
              </span>
              {collapsedSections.roles ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
            {!collapsedSections.roles && (
              <div className={styles['talent-pool__collapsible-content']}>
                <input
                  type="search"
                  value={roleQuery}
                  onChange={(event) => setRoleQuery(event.target.value)}
                  placeholder="Search roles"
                  className={styles['sidebar__option-search']}
                  aria-label="Search role filters"
                />
                {displayedRoleOptions.map(roleOption => (
                  <label key={roleOption} className={styles['sidebar__checkbox-row']}>
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(roleOption)}
                      onChange={() => toggleRole(roleOption)}
                      className={styles['sidebar__checkbox']}
                    />
                    <span>{roleOption}</span>
                  </label>
                ))}
                {filteredRoleOptions.length > OPTION_PREVIEW_COUNT && (
                  <button
                    type="button"
                    className={styles['sidebar__show-more']}
                    onClick={() =>
                      setShowAllOptions(prev => ({ ...prev, roles: !prev.roles }))
                    }
                  >
                    {showAllOptions.roles
                      ? 'Show fewer roles'
                      : `Show all roles (${filteredRoleOptions.length})`}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Skills */}
          <div className={styles['sidebar__section']}>
            <button
              className={styles['sidebar__collapsible']}
              onClick={() => toggleSection('skills')}
              aria-expanded={!collapsedSections.skills}
            >
              <span className={styles['sidebar__heading']} style={{ margin: 0 }}>
                Skills
              </span>
              {collapsedSections.skills ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
            {!collapsedSections.skills && (
              <div className={styles['talent-pool__collapsible-content']}>
                <input
                  type="search"
                  value={skillQuery}
                  onChange={(event) => setSkillQuery(event.target.value)}
                  placeholder="Search skills"
                  className={styles['sidebar__option-search']}
                  aria-label="Search skill filters"
                />
                <div className={styles['sidebar__pills']}>
                  {displayedSkillOptions.map(skillOption => (
                    <button
                      key={skillOption}
                      onClick={() => toggleSkill(skillOption)}
                      className={`${styles['sidebar__pill']} ${selectedSkills.includes(skillOption) ? styles['sidebar__pill--active'] : ''}`}
                    >
                      {skillOption}
                    </button>
                  ))}
                </div>
                {filteredSkillOptions.length > OPTION_PREVIEW_COUNT && (
                  <button
                    type="button"
                    className={styles['sidebar__show-more']}
                    onClick={() =>
                      setShowAllOptions(prev => ({ ...prev, skills: !prev.skills }))
                    }
                  >
                    {showAllOptions.skills
                      ? 'Show fewer skills'
                      : `Show all skills (${filteredSkillOptions.length})`}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Location */}
          <div className={styles['sidebar__section']}>
            <button
              className={styles['sidebar__collapsible']}
              onClick={() => toggleSection('location')}
              aria-expanded={!collapsedSections.location}
            >
              <span className={styles['sidebar__heading']} style={{ margin: 0 }}>
                Location
              </span>
              {collapsedSections.location ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
            {!collapsedSections.location && (
              <div className={styles['talent-pool__collapsible-content']}>
                <input
                  type="search"
                  value={locationQuery}
                  onChange={(event) => setLocationQuery(event.target.value)}
                  placeholder="Search locations"
                  className={styles['sidebar__option-search']}
                  aria-label="Search location filters"
                />
                {displayedLocationOptions.map(locationOption => (
                  <label key={locationOption} className={styles['sidebar__checkbox-row']}>
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(locationOption)}
                      onChange={() => toggleLocation(locationOption)}
                      className={styles['sidebar__checkbox']}
                    />
                    <span>{locationOption}</span>
                  </label>
                ))}
                {filteredLocationOptions.length > OPTION_PREVIEW_COUNT && (
                  <button
                    type="button"
                    className={styles['sidebar__show-more']}
                    onClick={() =>
                      setShowAllOptions(prev => ({ ...prev, location: !prev.location }))
                    }
                  >
                    {showAllOptions.location
                      ? 'Show fewer locations'
                      : `Show all locations (${filteredLocationOptions.length})`}
                  </button>
                )}
              </div>
            )}
          </div>

          <div className={styles['sidebar__mobile-actions']}>
            <button
              type="button"
              className={styles['sidebar__apply-btn']}
              onClick={() => setMobileFiltersOpen(false)}
            >
              View results ({filtered.length})
            </button>
          </div>
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
          {isDatabaseEmpty ? (
            <div className={styles['talent-pool__empty']}>
              <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>No Talents Available Yet</p>
              <p style={{ color: 'var(--rs-text-secondary, #666)' }}>We&apos;re currently building our talent pool. Check back soon to discover amazing professionals!</p>
            </div>
          ) : visible.length > 0 ? (
            <div className={styles['talent-pool__grid']}>
              {visible.map(talent => (
                <TalentCard key={talent.id} talent={talent} />
              ))}
            </div>
          ) : (
            <div className={styles['talent-pool__empty']}>
              <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>No Matching Talents</p>
              <p style={{ color: 'var(--rs-text-secondary, #666)' }}>Try adjusting your search or filters to find the perfect talent.</p>
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

