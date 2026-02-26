/**
 * E2E Test: Careers Page
 *
 * Tests the careers/talent page renders correctly.
 * Kept intentionally simple — verifies the page loads and has content.
 */

import { test, expect } from '@playwright/test'

test.describe('Careers Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/careers', { waitUntil: 'domcontentloaded' })
    })

    test('loads the careers page with a title', async ({ page }) => {
        const title = await page.title()
        expect(title.length).toBeGreaterThan(0)
        // Title should reference careers (actual: "Careers & Talent Opportunities | Romega Solutions")
        expect(title.toLowerCase()).toContain('career')
    })

    test('displays a page heading', async ({ page }) => {
        const heading = page.getByRole('heading').first()
        await expect(heading).toBeVisible({ timeout: 10000 })
    })

    test('page has meaningful content (not blank)', async ({ page }) => {
        const main = page.getByRole('main')
        await expect(main).toBeVisible({ timeout: 10000 })

        const bodyText = await page.innerText('body')
        expect(bodyText.length).toBeGreaterThan(100)
    })

    test('contains navigation to other pages', async ({ page }) => {
        // The page should have navigation links
        const links = page.getByRole('link')
        const count = await links.count()
        expect(count).toBeGreaterThan(3)
    })
})
