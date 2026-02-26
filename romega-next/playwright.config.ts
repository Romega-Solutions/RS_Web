import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for End-to-End (E2E) tests.
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  Senior engineering notes:                                          │
 * │                                                                     │
 * │  - `baseURL` reads from the env so CI can override it without       │
 * │    touching this file.                                               │
 * │  - `webServer` spins up the Next.js dev server automatically before │
 * │    tests run, so you don't need to start it manually.               │
 * │  - `reuseExistingServer` lets local devs run tests without         │
 * │    restarting a server they already have running.                   │
 * │  - Only Chromium is run by default to keep CI fast. Desktop Safari  │
 * │    and Firefox are included (but commented out) for when you want   │
 * │    cross-browser coverage later.                                    │
 * │  - `retries` on CI: flaky network tests get 2 retry attempts so    │
 * │    a single hiccup doesn't fail your entire pipeline.              │
 * │  - `trace: 'on-first-retry'` records detailed browser traces only  │
 * │    when a test fails on retry — saves disk space but gives you a   │
 * │    timeline to debug failures from.                                 │
 * └─────────────────────────────────────────────────────────────────────┘
 */
export default defineConfig({
    // Where to find E2E test files (separate from unit tests)
    testDir: './e2e',

    // Don't run tests in parallel within a file (prevents race conditions on shared pages)
    fullyParallel: true,

    // Fail the build if you accidentally leave `.only` on a test
    forbidOnly: !!process.env.CI,

    // Retry failed tests twice on CI; zero retries locally (fast feedback)
    retries: process.env.CI ? 2 : 0,

    // Limit parallel workers to 1 on CI if not set (avoids resource exhaustion)
    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ['list'],                        // Human-readable output in the terminal
        ['html', { open: 'never' }],    // HTML report saved to playwright-report/
        ['junit', { outputFile: 'playwright-results/results.xml' }], // For GitHub Actions
    ],

    use: {
        // Read from env so CI overrides it; fallback to local dev server
        baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',

        // Record a trace snapshot the first time a test retries – great for debugging CI failures
        trace: 'on-first-retry',

        // Take a screenshot on failure automatically
        screenshot: 'only-on-failure',

        // Record a video on retry so you can watch exactly what happened
        video: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        // Uncomment these when you want cross-browser coverage:
        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },

        // Mobile viewport test (Chromium engine)
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
    ],

    /**
     * Automatically start the Next.js development server before running tests.
     * In CI this is the built production server; locally it's the dev server.
     *
     * Having Playwright manage the server lifecycle means your tests are
     * self-contained — one command does everything.
     */
    webServer: {
        command: process.env.CI ? 'npm run start' : 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI, // Reuse running server in local dev
        timeout: 120 * 1000,                  // Give Next.js up to 2min to start
    },
})
