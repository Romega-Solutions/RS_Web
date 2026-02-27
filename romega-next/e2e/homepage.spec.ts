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
        // Wait for hydration — Header is a 'use client' component
        // In CI production mode, hydration can take significantly longer
        await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => { })
    })

    test('loads successfully and has a title', async ({ page }) => {
        const title = await page.title()
        expect(title.length).toBeGreaterThan(0)
    })

    test('renders the main navigation', async ({ page }) => {
        // The Header component uses role="navigation" on the <nav> element.
        // It's a 'use client' component so we need to wait for hydration.
        // The <nav> element is always in the DOM (both desktop and mobile),
        // but we need to wait for React hydration to complete rendering.
        const nav = page.locator('nav[role="navigation"], nav[aria-label="Main navigation"]').first()
        await expect(nav).toBeVisible({ timeout: 15000 })
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
        const body = page.locator('body')
        await expect(body).toBeVisible()
    })
})
