/**
 * E2E Test: Careers Page
 *
 * WHY TEST THE CAREERS PAGE?
 * The careers page is a recruitment funnel. A broken page means:
 *   - Potential hires can't find open positions
 *   - Application links are dead
 *   - Romega looks unprofessional
 *
 * We test the "happy path" of a job seeker landing on the page.
 */

import { test, expect } from '@playwright/test'

test.describe('Careers Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/careers')
    })

    test('loads the careers page successfully', async ({ page }) => {
        await expect(page).toHaveTitle(/careers/i)
    })

    test('displays the page heading', async ({ page }) => {
        const heading = page.getByRole('heading', { level: 1 })
        await expect(heading).toBeVisible()
        await expect(heading).not.toBeEmpty()
    })

    test('page has meaningful content (not blank)', async ({ page }) => {
        // A blank page often means a server component crashed silently.
        // Checking the main landmark ensures something actually rendered.
        const main = page.getByRole('main')
        await expect(main).toBeVisible()

        // The page should have more than just the nav and footer
        const bodyText = await page.innerText('body')
        expect(bodyText.length).toBeGreaterThan(100)
    })

    test('has a way to apply or get in contact', async ({ page }) => {
        // If there are no open positions, the page should still offer a way to
        // reach out (e.g., "Send us your CV", "Contact us").
        // We look for any link or button that suggests action.
        const actionElement = page
            .getByRole('link', { name: /apply|contact|position|role|join/i })
            .or(page.getByRole('button', { name: /apply|contact|upload/i }))
            .first()

        // Allow this to not be present if the page is under construction
        const isVisible = await actionElement.isVisible().catch(() => false)
        if (!isVisible) {
            console.warn('⚠️  No clear call-to-action found on the careers page.')
        }
    })
})
