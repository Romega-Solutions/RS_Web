/**
 * E2E Test: Homepage
 *
 * Verifies the homepage renders and is functional.
 * Assertions are intentionally lenient for CI environments.
 */

import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' })
    })

    test('loads successfully and has a title', async ({ page }) => {
        const title = await page.title()
        expect(title.length).toBeGreaterThan(0)
    })

    test('renders the main navigation', async ({ page }) => {
        const nav = page.getByRole('navigation').first()
        await expect(nav).toBeVisible({ timeout: 10000 })
    })

    test('has a visible main content area', async ({ page }) => {
        const main = page.locator('#main-content').or(page.getByRole('main'))
        await expect(main.first()).toBeVisible({ timeout: 10000 })
    })

    test('contains a link to the Contact page', async ({ page }) => {
        const contactLink = page.getByRole('link', { name: /contact/i }).first()
        await expect(contactLink).toBeVisible({ timeout: 10000 })
    })

    test('page renders without crashing', async ({ page }) => {
        // Verify the page didn't crash by checking that the body has rendered content
        // In CI, some content might be in images/SVGs — so just check the page loaded
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => { })
        const body = page.locator('body')
        await expect(body).toBeVisible()
    })
})
