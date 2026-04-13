/**
 * E2E Test: Homepage
 *
 * Verifies the homepage renders and is functional.
 * Uses deterministic anchors to reduce CI flake.
 */

import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
        const response = await page.goto('/', { waitUntil: 'domcontentloaded' })
        expect(response?.ok(), `GET / failed with status ${response?.status()}`).toBeTruthy()
        await expect(page).toHaveURL(/\/$/)

        const mainNav = page.getByRole('navigation', { name: /main navigation/i })
        await expect(mainNav).toBeVisible({ timeout: 30000 })
        await expect(mainNav.getByRole('list').getByRole('link', { name: 'About' })).toBeVisible({ timeout: 30000 })
    })

    test('loads successfully and has a title', async ({ page }) => {
        const title = await page.title()
        expect(title.length).toBeGreaterThan(0)
        expect(title.toLowerCase()).toContain('home')
    })

    test('renders the main navigation', async ({ page }) => {
        const mainNav = page.getByRole('navigation', { name: /main navigation/i }).getByRole('list')
        await expect(mainNav.getByRole('link', { name: 'About' })).toBeVisible({ timeout: 30000 })
        await expect(mainNav.getByRole('link', { name: 'Services' })).toBeVisible({ timeout: 30000 })
        await expect(mainNav.getByRole('link', { name: 'Contact' })).toBeVisible({ timeout: 30000 })
    })

    test('has a visible main content area', async ({ page }) => {
        await expect(page.locator('#main-content')).toBeVisible({ timeout: 30000 })
    })

    test('renders hero media with safe fallback', async ({ page }) => {
        const wrapper = page.getByTestId('home-hero-media-wrapper')
        await expect(wrapper).toBeVisible({ timeout: 30000 })

        const video = page.getByTestId('home-hero-video')
        const poster = page.getByTestId('home-hero-poster')

        if (await video.count()) {
            await expect(video).toBeVisible({ timeout: 30000 })
        } else {
            await expect(poster).toBeVisible({ timeout: 30000 })
        }
    })

    test('contains a link to the Contact page', async ({ page }) => {
        const mainNav = page.getByRole('navigation', { name: /main navigation/i }).getByRole('list')
        await expect(mainNav.getByRole('link', { name: 'Contact' })).toBeVisible({ timeout: 30000 })
    })

    test('page renders without crashing', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 30000 })
    })
})
