# Playwright Integration

This package exports custom Playwright fixtures for mail.tm email testing.

## Installation

```bash
npm install e2e-mail
# or
yarn add e2e-mail
```

## Usage

### 1. Create a fixture file

Create `playwright/fixtures/mail.ts`:

```typescript
export { test, expect } from "e2e-mail/playwright";
export type { MailFixtures } from "e2e-mail/playwright";
```

### 2. Update Playwright config

In your `playwright.config.ts`:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3000",
  },
});
```

### 3. Use in your tests

```typescript
import { test, expect } from "../fixtures/mail";

test("should fetch messages", async ({ getMailMessages }) => {
  const messages = await getMailMessages("test@example.com", "password123");

  expect(messages).toBeDefined();
  expect(Array.isArray(messages)).toBe(true);
});

test("should fetch filtered messages", async ({ getMailMessages }) => {
  const messages = await getMailMessages("test@example.com", "password123", {
    subject: "Welcome",
    sender: "noreply@example.com",
  });

  messages.forEach((msg) => {
    expect(msg.subject).toContain("Welcome");
  });
});
```

## API

### `getMailMessages(address, password, filters?)`

Fetches messages for a mail.tm account with optional filtering.

**Parameters:**

- `address` (string): Email address
- `password` (string): Account password
- `filters` (SearchFilters, optional): Filter criteria
  - `subject`: Filter by email subject
  - `sender`: Filter by sender email
  - `recipient`: Filter by recipient email
  - `createdAfter`: Filter by creation date (ISO 8601)
  - `createdBefore`: Filter by creation date (ISO 8601)

**Returns:** Promise that resolves to array of messages

## TypeScript Support

Types for `SearchFilters` and `MailFixtures` are automatically available:

```typescript
import type { SearchFilters, MailFixtures } from "e2e-mail/playwright";

const filters: SearchFilters = {
  subject: "Welcome",
  sender: "test@example.com",
};
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in UI mode
npx playwright test --ui

# Run specific test file
npx playwright test mail.spec.ts

# Run in specific browser
npx playwright test --project=chromium
```
