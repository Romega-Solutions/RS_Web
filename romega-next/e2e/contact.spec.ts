/**
 * E2E Test: Contact Page
 *
 * Tests the contact page renders and the form is interactable.
 * Excludes honeypot/anti-bot fields by targeting labelled controls.
 */

import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
    test.beforeEach(async ({ page }) => {
        const response = await page.goto('/contact', { waitUntil: 'domcontentloaded' })
        expect(response?.ok(), `GET /contact failed with status ${response?.status()}`).toBeTruthy()
        await expect(page).toHaveURL(/\/contact\/?$/)
        await expect(page.getByRole('heading', { level: 1, name: /contact us/i })).toBeVisible({ timeout: 30000 })
    })

    test('loads the contact page with a title', async ({ page }) => {
        const title = await page.title()
        expect(title.length).toBeGreaterThan(0)
        expect(title.toLowerCase()).toContain('contact')
    })

    test('displays the contact form', async ({ page }) => {
        await expect(page.getByLabel(/first name/i)).toBeVisible({ timeout: 30000 })
        await expect(page.getByRole('button', { name: /send message/i })).toBeVisible({ timeout: 30000 })
    })

    test('has input fields in the form', async ({ page }) => {
        await expect(page.getByLabel(/first name/i)).toBeVisible({ timeout: 30000 })
        await expect(page.getByLabel(/email/i)).toBeVisible({ timeout: 30000 })
        await expect(page.getByLabel(/phone number/i)).toBeVisible({ timeout: 30000 })
        await expect(page.getByLabel(/select subject/i)).toBeVisible({ timeout: 30000 })
        await expect(page.getByLabel(/message/i)).toBeVisible({ timeout: 30000 })
    })

    test('shows validation errors when form is submitted empty', async ({ page }) => {
        const submitButton = page.getByRole('button', { name: /send message/i })
        await expect(submitButton).toBeVisible({ timeout: 30000 })
        await submitButton.click()

        await expect(page.getByText('First name is required')).toBeVisible({ timeout: 10000 })
        await expect(page.getByText('Last name is required')).toBeVisible({ timeout: 10000 })
        await expect(page.getByText('Email is required')).toBeVisible({ timeout: 10000 })
    })

    test('page renders without crashing', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: /contact us/i })).toBeVisible({ timeout: 30000 })
    })
})
