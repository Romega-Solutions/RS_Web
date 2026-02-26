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
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => { })

        // Look for any input or textarea inside a form — flexible for any form structure
        const formInputs = page.locator('form input, form textarea, form select')
        const count = await formInputs.count()
        expect(count).toBeGreaterThan(0)
    })

    test('shows validation errors when form is submitted empty', async ({ page }) => {
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => { })

        // Find and click any submit-like button
        const submitButton = page.locator('form button[type="submit"], form button').first()
        await expect(submitButton).toBeVisible({ timeout: 10000 })
        await submitButton.click()

        // After clicking submit with empty fields, error messages should appear
        const errorMessages = page.locator('[role="alert"]')
        await expect(errorMessages.first()).toBeVisible({ timeout: 5000 })
    })

    test('page renders without crashing', async ({ page }) => {
        const body = page.locator('body')
        await expect(body).toBeVisible()
    })
})
