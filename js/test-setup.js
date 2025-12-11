// Test setup for Jest with jsdom environment
// Mock EmailJS for testing
global.emailjs = {
    init: jest.fn(),
    send: jest.fn()
};

// Mock console methods to avoid noise in tests
global.console = {
    ...console,
    log: jest.fn(),
    error: jest.fn()
};