import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

/**
 * Vitest configuration for unit and component tests.
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  Why these choices matter (senior engineering perspective):          │
 * │                                                                     │
 * │  - `jsdom` environment → simulates the browser so React components  │
 * │    can render and be tested without an actual browser.               │
 * │  - `globals: true` → lets you use `describe`, `it`, `expect`        │
 * │    without importing them (matches Jest API, less boilerplate).      │
 * │  - `setupFiles` → a single place to add global test helpers         │
 * │    (@testing-library/jest-dom matchers like `toBeInTheDocument`).   │
 * │  - `alias @/*` → mirrors the tsconfig path alias so imports don't  │
 * │    break in tests.                                                   │
 * │  - `coverage.reporter` → generates both a human-readable HTML       │
 * │    report AND the machine-readable lcov, which CI tools use.        │
 * │  - `exclude` patterns → avoid wasting time running Playwright E2E   │
 * │    tests through Vitest (they have their own runner).               │
 * └─────────────────────────────────────────────────────────────────────┘
 */
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
        },
    },
    test: {
        // Use jsdom to simulate a browser environment for React component tests
        environment: 'jsdom',

        // Expose `describe`, `it`, `expect` etc. as globals – no need to import
        globals: true,

        // Run this file before every test suite to register custom matchers
        setupFiles: ['./vitest.setup.ts'],

        // Where to find unit/component tests (NOT e2e – Playwright handles those)
        include: ['**/__tests__/**/*.{test,spec}.{ts,tsx}'],
        exclude: [
            'node_modules/**',
            'e2e/**',          // Playwright tests live here – do not double-run
            '.next/**',
        ],

        coverage: {
            provider: 'v8',    // Built into Node – no extra install needed
            reporter: ['text', 'html', 'lcov'],
            reportsDirectory: './coverage',

            // Coverage thresholds – fail the CI job if any drop below these
            thresholds: {
                lines: 70,
                functions: 70,
                branches: 60,
                statements: 70,
            },

            // Only count coverage on OUR source files, not node_modules / tests
            include: ['lib/**', 'components/**', 'app/**'],
            exclude: [
                'node_modules/**',
                '**/__tests__/**',
                '**/*.config.*',
                '**/types/**',
            ],
        },
    },
})
