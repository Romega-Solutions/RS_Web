/**
 * E2E Test: Contact Page
 *
 * Tests the contact page renders and the form works.
 * Uses flexible selectors that work with both SSR and client hydration.
 */

import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
    test.beforeEach(async ({ page }) => {
        const response = await page.goto('/contact', { waitUntil: 'domcontentloaded' })
        expect(response?.ok(), `GET /contact failed with status ${response?.status()}`).toBeTruthy()
        // Wait for hydration — ContactPageClient, ContactContainer, and
        // ContactForm are all 'use client' components. In CI production
        // mode the hydration chain can take significantly longer.
        await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => { })
    })

    test('loads the contact page with a title', async ({ page }) => {
        const title = await page.title()
        expect(title.length).toBeGreaterThan(0)
        expect(title.toLowerCase()).toContain('contact')
    })

    test('displays the contact form', async ({ page }) => {
        // Assert a concrete, user-visible control from the contact form.
        // This avoids false positives from hidden honeypot fields and brittle generic form matching.
        const firstName = page.locator('input[name="firstName"]')
        await expect(firstName).toBeVisible({ timeout: 30000 })
    })

    test('has input fields in the form', async ({ page }) => {
        const firstName = page.locator('input[name="firstName"]')
        const email = page.locator('input[name="email"]')
        const phone = page.locator('input[name="phone"]')
        const subject = page.locator('select[name="subject"]')

        await expect(firstName).toBeVisible({ timeout: 30000 })
        await expect(email).toBeVisible({ timeout: 15000 })
        await expect(phone).toBeVisible({ timeout: 15000 })
        await expect(subject).toBeVisible({ timeout: 15000 })
    })

    test('shows validation errors when form is submitted empty', async ({ page }) => {
        // Use an accessible, user-visible selector for the form action.
        const submitButton = page.getByRole('button', { name: /send message/i }).first()
        await expect(submitButton).toBeVisible({ timeout: 30000 })
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
