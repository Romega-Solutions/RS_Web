/**
 * E2E Test: Homepage
 *
 * Tests the most critical page of the site — the front door.
 * These assertions are intentionally resilient for CI environments
 * where the server is slower and env vars may not be fully configured.
 */

import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' })
    })

    test('loads successfully and has a title', async ({ page }) => {
        // Just verify the page has a non-empty title (any title means the app rendered)
        const title = await page.title()
        expect(title.length).toBeGreaterThan(0)
    })

    test('renders the main navigation', async ({ page }) => {
        const nav = page.getByRole('navigation').first()
        await expect(nav).toBeVisible({ timeout: 10000 })
    })

    test('has a visible main content area', async ({ page }) => {
        const main = page.getByRole('main')
        await expect(main).toBeVisible({ timeout: 10000 })
    })

    test('contains a link to the Contact page', async ({ page }) => {
        const contactLink = page.getByRole('link', { name: /contact/i }).first()
        await expect(contactLink).toBeVisible({ timeout: 10000 })
    })

    test('contains navigation links', async ({ page }) => {
        // Verify there are multiple links in the page (nav + content)
        const links = page.getByRole('link')
        const count = await links.count()
        expect(count).toBeGreaterThan(3)
    })

    test('page has meaningful content (not blank)', async ({ page }) => {
        const bodyText = await page.innerText('body')
        expect(bodyText.length).toBeGreaterThan(100)
    })
})
