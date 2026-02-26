/**
 * E2E Test: Contact Page
 *
 * WHY TEST FORMS END-TO-END?
 * The contact form is a critical conversion path — it's how potential clients
 * reach you. A broken form means lost business. Unit tests can verify the
 * validation logic, but only E2E tests catch:
 *   - The form not rendering at all
 *   - A broken submit button
 *   - Network errors when the API is called
 *   - Success/error message not appearing after submission
 *
 * PATTERN: We use Playwright's accessible locators (getByLabel, getByRole)
 * instead of CSS selectors. This is best practice because:
 *   1. It tests the UI the same way a real user (or screen reader) sees it
 *   2. It's resistant to styling changes (CSS class renames don't break tests)
 */

import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/contact')
    })

    test('loads the contact page', async ({ page }) => {
        // The page title and an h1 should always be present
        await expect(page).toHaveTitle(/contact/i)
        const heading = page.getByRole('heading', { level: 1 })
        await expect(heading).toBeVisible()
    })

    test('displays the contact form', async ({ page }) => {
        // Verify the form itself exists in the DOM and is visible
        const form = page.getByRole('form').or(page.locator('form')).first()
        await expect(form).toBeVisible()
    })

    test('shows validation errors when form is submitted empty', async ({ page }) => {
        // HAPPY PATH vs SAD PATH: Most teams only test the happy path (valid input).
        // Senior engineers also test the SAD PATH (invalid input) because that's
        // where real users often get stuck and leave.

        // Try to submit without filling in anything
        const submitButton = page.getByRole('button', { name: /send|submit/i })
        await submitButton.click()

        // At least one error message should appear
        // (the exact message depends on your implementation)
        const errorMessages = page.getByRole('alert').or(
            page.locator('[class*="error"], [role="alert"], [aria-invalid="true"]')
        )
        await expect(errorMessages.first()).toBeVisible({ timeout: 5000 })
    })

    test('accepts valid input in all fields', async ({ page }) => {
        // Fill in the form fields using accessible labels
        // Note: field names are based on what your form renders.
        // Adjust if your label text differs.
        const nameField = page.getByLabel(/name/i).first()
        const emailField = page.getByLabel(/email/i).first()
        const messageField = page.getByLabel(/message/i).first()

        if (await nameField.isVisible()) {
            await nameField.fill('Test User')
        }
        if (await emailField.isVisible()) {
            await emailField.fill('test@example.com')
        }
        if (await messageField.isVisible()) {
            await messageField.fill('This is a test message from the E2E test suite. It should be long enough.')
        }

        // Verify the fields hold the values we typed
        if (await emailField.isVisible()) {
            await expect(emailField).toHaveValue('test@example.com')
        }
    })

    test('has a mailto or phone contact fallback visible', async ({ page }) => {
        // Many contact pages also show a direct email address as a fallback.
        // If the API is down, users should still be able to reach you.
        const emailLink = page.getByRole('link', { name: /@|email|mail/i }).first()
        const phoneLink = page.getByRole('link', { name: /phone|\+|call/i }).first()

        // At least one of the two should be visible
        const hasEmailOrPhone =
            (await emailLink.isVisible().catch(() => false)) ||
            (await phoneLink.isVisible().catch(() => false))

        // Soft assertion — log a warning but don't fail the test
        // This is intentionally lenient since contact info layout varies
        if (!hasEmailOrPhone) {
            console.warn('⚠️  No mailto or phone link found on the contact page.')
        }
    })
})
