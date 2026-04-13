/**
 * Unit tests for lib/utils.ts
 *
 * WHY WE TEST UTILITY FUNCTIONS FIRST:
 * Utility functions are the "building blocks" of your app — they're pure
 * functions (same input always gives same output, no side effects) which
 * makes them the easiest and most valuable things to test. If these break,
 * everything built on top of them breaks too.
 *
 * PATTERN USED: Arrange → Act → Assert (AAA)
 *   1. Arrange  – set up your inputs
 *   2. Act      – call the function
 *   3. Assert   – check the result is what you expected
 */

import { describe, it, expect } from 'vitest'
import {
    cn,
    formatDate,
    slugify,
    truncate,
    getInitials,
    formatCurrency,
    generateId,
} from '@/lib/utils'

// ─── cn() ─────────────────────────────────────────────────────────────────────
// This merges Tailwind CSS class names and resolves conflicts (e.g. when two
// classes both set padding, only the last one wins).

describe('cn()', () => {
    it('merges multiple class strings', () => {
        expect(cn('px-2', 'py-4')).toBe('px-2 py-4')
    })

    it('deduplicates conflicting Tailwind classes (last one wins)', () => {
        // If you pass both "px-2" and "px-4", Tailwind-merge keeps only "px-4"
        expect(cn('px-2', 'px-4')).toBe('px-4')
    })

    it('handles conditional classes (falsy values are ignored)', () => {
        expect(cn('base', false && 'hidden', undefined, 'extra')).toBe('base extra')
    })

    it('returns an empty string when no classes are given', () => {
        expect(cn()).toBe('')
    })
})

// ─── slugify() ────────────────────────────────────────────────────────────────
// Turns human-readable text into a URL-safe slug.
// e.g. "Hello World!" → "hello-world"
// This is critical for SEO-friendly URLs in your blog/careers pages.

describe('slugify()', () => {
    it('converts spaces to hyphens', () => {
        expect(slugify('Hello World')).toBe('hello-world')
    })

    it('removes special characters', () => {
        expect(slugify('Hello, World!')).toBe('hello-world')
    })

    it('collapses multiple hyphens into one', () => {
        expect(slugify('hello   world')).toBe('hello-world')
    })

    it('strips leading and trailing hyphens', () => {
        expect(slugify('  hello world  ')).toBe('hello-world')
    })

    it('handles already-lowercase strings without change', () => {
        expect(slugify('already-clean')).toBe('already-clean')
    })

    it('handles empty string', () => {
        expect(slugify('')).toBe('')
    })
})

// ─── truncate() ───────────────────────────────────────────────────────────────
// Cuts text at a max length and appends "..." – used in card previews so
// long text doesn't overflow the UI.

describe('truncate()', () => {
    it('does not truncate text shorter than the limit', () => {
        expect(truncate('Hello', 10)).toBe('Hello')
    })

    it('truncates text exceeding the limit and adds "..."', () => {
        expect(truncate('Hello World', 5)).toBe('Hello...')
    })

    it('uses a custom suffix when provided', () => {
        expect(truncate('Hello World', 5, ' →')).toBe('Hello →')
    })

    it('returns the full string when length equals the text length', () => {
        expect(truncate('Hello', 5)).toBe('Hello')
    })
})

// ─── getInitials() ────────────────────────────────────────────────────────────
// Extracts initials from a full name – shown in avatar fallbacks.
// e.g. "John Doe" → "JD"

describe('getInitials()', () => {
    it('returns two uppercase initials from a full name', () => {
        expect(getInitials('John Doe')).toBe('JD')
    })

    it('returns only one initial for a single-word name', () => {
        expect(getInitials('John')).toBe('J')
    })

    it('caps at 2 characters for names with 3+ words', () => {
        expect(getInitials('John Michael Doe')).toBe('JM')
    })

    it('uppercases lowercase input', () => {
        expect(getInitials('ken garcia')).toBe('KG')
    })
})

// ─── formatCurrency() ─────────────────────────────────────────────────────────
// Formats a number as USD by default, or any other currency.
// Important: locale-formatted strings can vary slightly between environments,
// so we check `.includes()` rather than exact equality.

describe('formatCurrency()', () => {
    it('formats a number as USD by default', () => {
        const result = formatCurrency(1000)
        expect(result).toContain('1,000')
        expect(result).toContain('$')
    })

    it('formats with a custom currency', () => {
        const result = formatCurrency(500, 'EUR')
        expect(result).toContain('500')
        expect(result).toContain('€')
    })
})

// ─── generateId() ─────────────────────────────────────────────────────────────
// Creates a random alphanumeric ID – used for unique element keys.

describe('generateId()', () => {
    it('returns a string of the default length (8)', () => {
        const id = generateId()
        expect(typeof id).toBe('string')
        expect(id.length).toBe(8)
    })

    it('returns a string of the requested custom length', () => {
        expect(generateId(12).length).toBe(12)
    })

    it('generates a different ID each time (probabilistic)', () => {
        // The chance of two 8-char random IDs colliding is astronomically small
        expect(generateId()).not.toBe(generateId())
    })
})

// ─── formatDate() ─────────────────────────────────────────────────────────────
// Formats a Date or ISO string into a readable date.
// We use toContain() because the exact format depends on the test runner's locale.

describe('formatDate()', () => {
    it('formats a Date object into a readable string', () => {
        const date = new Date('2024-01-15')
        const result = formatDate(date)
        expect(result).toContain('2024')
        expect(result).toContain('15')
    })

    it('accepts an ISO date string as input', () => {
        const result = formatDate('2024-06-01')
        expect(result).toContain('2024')
    })

    it('respects custom format options', () => {
        const result = formatDate('2024-01-15', { year: 'numeric', month: '2-digit' })
        expect(result).toContain('2024')
    })
})
