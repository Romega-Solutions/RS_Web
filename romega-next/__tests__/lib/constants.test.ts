/**
 * Unit tests for lib/constants.ts
 *
 * WHY TEST CONSTANTS?
 * These aren't just "magic numbers" – they define the contract of your app:
 * routes, validation limits, file sizes. If someone accidentally changes
 * VALIDATION.NAME_MAX_LENGTH from 100 to 10, a form that worked yesterday
 * silently breaks. Tests make those changes visible and intentional.
 */

import { describe, it, expect } from 'vitest'
import {
    ROUTES,
    API_ROUTES,
    VALIDATION,
    FILE_UPLOAD,
    ITEMS_PER_PAGE,
    SITE_NAME,
} from '@/lib/constants'

describe('SITE_NAME', () => {
    it('is defined and non-empty', () => {
        expect(SITE_NAME).toBeTruthy()
        expect(typeof SITE_NAME).toBe('string')
    })
})

describe('ROUTES', () => {
    it('defines a home route at "/"', () => {
        expect(ROUTES.HOME).toBe('/')
    })

    it('all routes start with "/"', () => {
        Object.values(ROUTES).forEach((route) => {
            expect(route).toMatch(/^\//)
        })
    })

    it('has a contact route', () => {
        expect(ROUTES.CONTACT).toBeDefined()
    })

    it('has a careers route', () => {
        expect(ROUTES.CAREERS).toBeDefined()
    })
})

describe('API_ROUTES', () => {
    it('all API routes start with "/api/"', () => {
        Object.values(API_ROUTES).forEach((route) => {
            expect(route).toMatch(/^\/api\//)
        })
    })

    it('exposes a contact API route', () => {
        expect(API_ROUTES.CONTACT).toBe('/api/contact')
    })
})

describe('VALIDATION', () => {
    it('sets a minimum name length', () => {
        expect(VALIDATION.NAME_MIN_LENGTH).toBeGreaterThan(0)
    })

    it('min length is less than max length', () => {
        expect(VALIDATION.NAME_MIN_LENGTH).toBeLessThan(VALIDATION.NAME_MAX_LENGTH)
    })

    it('message max length allows for meaningful messages (≥ 100 chars)', () => {
        expect(VALIDATION.MESSAGE_MAX_LENGTH).toBeGreaterThanOrEqual(100)
    })
})

describe('FILE_UPLOAD', () => {
    it('maximum file size is 5MB', () => {
        expect(FILE_UPLOAD.MAX_SIZE).toBe(5 * 1024 * 1024)
    })

    it('allows PDF files', () => {
        expect(FILE_UPLOAD.ALLOWED_TYPES).toContain('application/pdf')
    })

    it('allowed extensions include .pdf', () => {
        expect(FILE_UPLOAD.ALLOWED_EXTENSIONS).toContain('.pdf')
    })
})

describe('ITEMS_PER_PAGE', () => {
    it('is a positive integer', () => {
        expect(ITEMS_PER_PAGE).toBeGreaterThan(0)
        expect(Number.isInteger(ITEMS_PER_PAGE)).toBe(true)
    })
})
