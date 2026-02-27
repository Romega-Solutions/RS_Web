/**
 * E2E Test: Contact Page
 *
 * Tests the contact page renders and the form works.
 * Uses flexible selectors that work with both SSR and client hydration.
 */

import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/contact', { waitUntil: 'domcontentloaded' })
    })

    test('loads the contact page with a title', async ({ page }) => {
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => { })
        const title = await page.title()
        expect(title.length).toBeGreaterThan(0)
        expect(title.toLowerCase()).toContain('contact')
    })

    test('displays the contact form', async ({ page }) => {
        const form = page.locator('form').first()
        await expect(form).toBeVisible({ timeout: 10000 })
    })

    test('has input fields in the form', async ({ page }) => {
        // Wait for client hydration — the form is a 'use client' component
        // In CI production mode, hydration can take significantly longer
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => { })

        // Wait for the form to be visible first (ensures SSR has rendered)
        const form = page.locator('form').first()
        await expect(form).toBeVisible({ timeout: 15000 })

        // Now wait for at least one visible input inside the form
        // Using toBeVisible() with timeout instead of count() which doesn't wait
        const firstInput = page.locator('form input[type="text"], form input[type="email"], form input[type="tel"], form textarea, form select').first()
        await expect(firstInput).toBeVisible({ timeout: 10000 })
    })

    test('shows validation errors when form is submitted empty', async ({ page }) => {
        // Wait for full hydration so React event handlers are attached
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => { })

        // Wait for the form to be fully hydrated and interactive
        const form = page.locator('form').first()
        await expect(form).toBeVisible({ timeout: 15000 })

        // Find and click the submit button (must be type="submit" inside the form)
        const submitButton = page.locator('form button[type="submit"]').first()
        await expect(submitButton).toBeVisible({ timeout: 10000 })
        await submitButton.click()

        // After clicking submit with empty fields, error messages should appear
        // These are rendered as divs with role="alert" by the ContactForm component
        const errorMessages = page.locator('[role="alert"]')
        await expect(errorMessages.first()).toBeVisible({ timeout: 10000 })
    })

    test('page renders without crashing', async ({ page }) => {
        const body = page.locator('body')
        await expect(body).toBeVisible()
    })
})
