'use client';

import { useState } from 'react';
import TalentCard from './TalentCard';
import styles from './TalentPool.module.css';

interface Talent {
  id: string;
  name: string;
  role: string;
  skills: string[];
  experience: string;
  availability: 'Available' | 'Busy' | 'Part-time';
  image: string;
  location: string;
  rate: string;
}

export default function TalentPool() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Talent' },
    { id: 'development', label: 'Development' },
    { id: 'design', label: 'Design' },
    { id: 'data', label: 'Data Science' },
    { id: 'management', label: 'Project Management' },
  ];

  const talents: Talent[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Senior Full Stack Developer',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      experience: '8+ years',
      availability: 'Available',
      image: '/images/about/IC/man1.png',
      location: 'United States',
      rate: '$80-120/hr',
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'UI/UX Designer',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      experience: '6+ years',
      availability: 'Part-time',
      image: '/images/about/IC/man2.png',
      location: 'Canada',
      rate: '$70-100/hr',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Data Scientist',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
      experience: '5+ years',
      availability: 'Available',
      image: '/images/about/IC/man1.png',
      location: 'Spain',
      rate: '$75-110/hr',
    },
    {
      id: '4',
      name: 'David Kim',
      role: 'DevOps Engineer',
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
      experience: '7+ years',
      availability: 'Busy',
      image: '/images/about/IC/man2.png',
      location: 'South Korea',
      rate: '$85-125/hr',
    },
    {
      id: '5',
      name: 'Anna Kowalski',
      role: 'Mobile Developer',
      skills: ['React Native', 'iOS', 'Android', 'Flutter'],
      experience: '4+ years',
      availability: 'Available',
      image: '/images/about/IC/man1.png',
      location: 'Poland',
      rate: '$65-95/hr',
    },
    {
      id: '6',
      name: 'James Wilson',
      role: 'Product Manager',
      skills: ['Agile', 'Scrum', 'Roadmapping', 'Stakeholder Management'],
      experience: '10+ years',
      availability: 'Part-time',
      image: '/images/about/IC/man2.png',
      location: 'United Kingdom',
      rate: '$90-130/hr',
    },
  ];

  const filteredTalents = selectedCategory === 'all' 
    ? talents 
    : talents.filter(talent => {
        const roleLower = talent.role.toLowerCase();
        if (selectedCategory === 'development') return roleLower.includes('developer') || roleLower.includes('engineer');
        if (selectedCategory === 'design') return roleLower.includes('design');
        if (selectedCategory === 'data') return roleLower.includes('data');
        if (selectedCategory === 'management') return roleLower.includes('manager');
        return true;
      });

  return (
    <section className={styles['talent-pool']} aria-labelledby="talent-pool-heading">
      <div className={styles['talent-pool__container']}>
        {/* Header */}
        <div className={styles['talent-pool__header']}>
          <span className={styles['talent-pool__badge']}>Browse Talent</span>
          <h2 id="talent-pool-heading" className={styles['talent-pool__title']}>
            Discover Your Next Team Member
          </h2>
          <p className={styles['talent-pool__description']}>
            Connect with vetted professionals who are ready to contribute to your success.
          </p>
        </div>

        {/* Filters */}
        <div className={styles['talent-pool__filters']}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`${styles['talent-pool__filter-btn']} ${
                selectedCategory === category.id ? styles['talent-pool__filter-btn--active'] : ''
              }`}
              aria-pressed={selectedCategory === category.id}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Talent Grid */}
        <div className={styles['talent-pool__grid']}>
          {filteredTalents.map((talent) => (
            <TalentCard key={talent.id} talent={talent} />
          ))}
        </div>

        {/* Empty State */}
        {filteredTalents.length === 0 && (
          <div className={styles['talent-pool__empty']}>
            <p>No talent found in this category. Try selecting a different filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
