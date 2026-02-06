'use client';

import { useEffect } from 'react';

/**
 * Copy Protection Component
 * Prevents text selection, copying, right-click, and developer tools access
 */
export default function CopyProtection() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection via mouse
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      // Allow selection in input fields
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return true;
      }
      e.preventDefault();
      return false;
    };

    // Disable copy event
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      // Allow copying from input fields
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return true;
      }
      e.preventDefault();
      return false;
    };

    // Disable cut event
    const handleCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      // Allow cutting from input fields
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return true;
      }
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for copying and dev tools
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      // Allow shortcuts in input fields
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return true;
      }

      // Prevent common copy/dev tool shortcuts
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'C')) || // Copy
        (e.ctrlKey && (e.key === 'x' || e.key === 'X')) || // Cut
        (e.ctrlKey && (e.key === 'a' || e.key === 'A')) || // Select All
        (e.ctrlKey && (e.key === 'u' || e.key === 'U')) || // View Source
        (e.ctrlKey && (e.key === 's' || e.key === 'S')) || // Save
        e.key === 'F12' || // Developer Tools
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) || // Inspect
        (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) || // Console
        (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) || // Inspect Element
        (e.metaKey && (e.key === 'c' || e.key === 'C')) || // Mac Copy
        (e.metaKey && (e.key === 'x' || e.key === 'X')) || // Mac Cut
        (e.metaKey && (e.key === 'a' || e.key === 'A')) // Mac Select All
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Disable drag and drop of text/images
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return true;
      }
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu, false);
    document.addEventListener('selectstart', handleSelectStart, false);
    document.addEventListener('copy', handleCopy, false);
    document.addEventListener('cut', handleCut, false);
    document.addEventListener('keydown', handleKeyDown, false);
    document.addEventListener('dragstart', handleDragStart, false);

    console.log('Copy protection enabled');

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return null; // This component doesn't render anything
}
