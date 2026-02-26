/**
 * E2E Test: Contact Page
 *
 * Tests the contact page form and content rendering.
 * Assertions are kept resilient — they verify the page functions
 * rather than asserting on specific CSS class names or exact text.
 */

import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/contact', { waitUntil: 'domcontentloaded' })
    })

    test('loads the contact page with a title', async ({ page }) => {
        const title = await page.title()
        expect(title.length).toBeGreaterThan(0)
        // Title should contain "Contact" (actual: "Contact Us | Romega Solutions")
        expect(title.toLowerCase()).toContain('contact')
    })

    test('displays the contact form', async ({ page }) => {
        // The form element exists and is visible
        const form = page.locator('form').first()
        await expect(form).toBeVisible({ timeout: 10000 })
    })

    test('has input fields for name and email', async ({ page }) => {
        // Verify key form fields exist using their labels
        const firstNameInput = page.locator('#firstName')
        const emailInput = page.locator('#email')

        await expect(firstNameInput).toBeVisible({ timeout: 10000 })
        await expect(emailInput).toBeVisible({ timeout: 10000 })
    })

    test('shows validation errors when form is submitted empty', async ({ page }) => {
        // Find and click the submit button
        const submitButton = page.getByRole('button', { name: /send|submit|get in touch/i }).first()
        await expect(submitButton).toBeVisible({ timeout: 10000 })
        await submitButton.click()

        // After clicking submit with empty fields, error messages should appear
        // The form uses role="alert" divs for validation errors
        const errorMessages = page.locator('[role="alert"]')
        await expect(errorMessages.first()).toBeVisible({ timeout: 5000 })
    })

    test('page has meaningful content beyond just the form', async ({ page }) => {
        const bodyText = await page.innerText('body')
        expect(bodyText.length).toBeGreaterThan(100)
    })
})
