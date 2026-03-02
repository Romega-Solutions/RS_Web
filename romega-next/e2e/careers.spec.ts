/**
 * E2E Test: Careers Page
 *
 * Tests the careers page renders correctly with deterministic selectors.
 */

import { test, expect } from '@playwright/test'

test.describe('Careers Page', () => {
    test.beforeEach(async ({ page }) => {
        const response = await page.goto('/careers', { waitUntil: 'domcontentloaded' })
        expect(response?.ok(), `GET /careers failed with status ${response?.status()}`).toBeTruthy()
        await expect(page).toHaveURL(/\/careers\/?$/)
        await expect(page.getByRole('heading', { level: 1, name: /explore leadership opportunities/i })).toBeVisible({ timeout: 30000 })
    })

    test('loads the careers page with a title', async ({ page }) => {
        const title = await page.title()
        expect(title.length).toBeGreaterThan(0)
        expect(title.toLowerCase()).toContain('career')
    })

    test('displays a page heading', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: /explore leadership opportunities/i })).toBeVisible({ timeout: 30000 })
    })

    test('page has meaningful content (not blank)', async ({ page }) => {
        await expect(page.getByRole('button', { name: /view open roles/i })).toBeVisible({ timeout: 30000 })
        await expect(page.getByRole('heading', { name: /what we're looking for/i })).toBeVisible({ timeout: 30000 })
    })

    test('contains navigation to other pages', async ({ page }) => {
        const mainNav = page.getByRole('navigation', { name: /main navigation/i }).getByRole('list')
        await expect(mainNav.getByRole('link', { name: 'About' })).toBeVisible({ timeout: 30000 })
        await expect(mainNav.getByRole('link', { name: 'Services' })).toBeVisible({ timeout: 30000 })
        await expect(mainNav.getByRole('link', { name: 'Contact' })).toBeVisible({ timeout: 30000 })
    })
})
