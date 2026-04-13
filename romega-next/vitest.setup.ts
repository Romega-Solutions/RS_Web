/**
 * Global test setup file – runs once before every test suite.
 *
 * What this does (in plain English):
 *   @testing-library/jest-dom adds extra "matchers" that make your test
 *   assertions read like English.  For example, instead of:
 *     expect(element.textContent).toBe('Hello')
 *   you can write:
 *     expect(element).toHaveTextContent('Hello')
 *
 * This file tells Vitest to load those matchers globally so you don't
 * have to import them in every single test file.
 */
import '@testing-library/jest-dom'
