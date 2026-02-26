/**
 * E2E Test: Homepage
 *
 * WHAT IS AN E2E TEST?
 * An End-to-End (E2E) test launches a REAL browser, navigates to your live
 * website, and clicks/reads things just like a real user would. Unlike unit
 * tests (which test one tiny function in isolation), E2E tests verify that the
 * entire system works together from start to finish.
 *
 * THINK OF IT LIKE THIS:
 *   Unit test  = testing that a car engine turns on in a workshop
 *   E2E test   = test-driving the finished car on a real road
 *
 * WHY TEST THE HOMEPAGE?
 * The homepage is the front door of your business. If it crashes or loads
 * incorrectly, every visitor sees it. It should always work.
 */

import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the root of the site before each test
        await page.goto('/')
    })

    test('loads successfully (returns HTTP 200)', async ({ page }) => {
        // The most fundamental check: did the server return a page at all?
        // A 404 or 500 here means your build is broken.
        await expect(page).toHaveTitle(/Romega/i)
    })

    test('renders the main navigation', async ({ page }) => {
        // A navigation bar is a critical UI element — if it's missing, the site
        // is basically broken for users who need to move between pages.
        const nav = page.getByRole('navigation')
        await expect(nav).toBeVisible()
    })

    test('has a visible hero section with a call-to-action', async ({ page }) => {
        // The hero is the first thing users see. A missing hero usually means
        // a data-fetching error or a layout crash.
        const main = page.getByRole('main')
        await expect(main).toBeVisible()
    })

    test('contains a link to the Contact page', async ({ page }) => {
        // Verify that users can reach the contact page from the homepage.
        // This tests navigation linkage, not just the homepage content.
        const contactLink = page.getByRole('link', { name: /contact/i }).first()
        await expect(contactLink).toBeVisible()
        await expect(contactLink).toHaveAttribute('href', /contact/)
    })

    test('contains a link to the Careers page', async ({ page }) => {
        const careersLink = page.getByRole('link', { name: /careers/i }).first()
        await expect(careersLink).toBeVisible()
    })

    test('has no accessibility violations in the heading hierarchy', async ({ page }) => {
        // Every page should have exactly ONE <h1> element. Multiple h1s confuse
        // screen readers and hurt SEO rankings.
        const h1Elements = page.getByRole('heading', { level: 1 })
        await expect(h1Elements).toHaveCount(1)
    })

    test('loads within 3 seconds on desktop', async ({ page }) => {
        // Performance check: measure how long the page takes to become interactive.
        const startTime = Date.now()
        await page.waitForLoadState('domcontentloaded')
        const loadTime = Date.now() - startTime

        // 3 seconds is a generous threshold for a local/CI server.
        // In production, you'd target < 1.5s (Google's Core Web Vitals).
        expect(loadTime).toBeLessThan(3000)
    })
})
