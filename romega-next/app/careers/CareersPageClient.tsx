'use client';

import { useState, useEffect } from 'react';
import CareersHero from '@/components/organisms/careers/CareersHero';
import JobsSidebar from '@/components/organisms/careers/JobsSidebar';

export default function CareersPageClient() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Listen for the custom event from CareersHero
    const handleOpenSidebar = () => {
      console.log('Received openJobsSidebar event, opening sidebar');
      setIsSidebarOpen(true);
    };

    window.addEventListener('openJobsSidebar', handleOpenSidebar);

    return () => {
      window.removeEventListener('openJobsSidebar', handleOpenSidebar);
    };
  }, []);

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <CareersHero />
      <JobsSidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
    </>
  );
}
