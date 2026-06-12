# Cypress Integration

This package exports custom Cypress commands for mail.tm email testing.

## Installation

```bash
npm install e2e-mail
# or
yarn add e2e-mail
```

## Usage

### 1. Register the commands

In your `cypress/support/e2e.ts` (or `e2e.js`), import the commands:

```typescript
import "e2e-mail/cypress";
```

### 2. Use in your tests

```typescript
describe("My Test Suite", () => {
  it("should fetch messages", () => {
    cy.getMailMessages("test@example.com", "password123").then((messages) => {
      expect(messages).to.have.length.greaterThan(0);
    });
  });

  it("should fetch filtered messages", () => {
    cy.getMailMessages("test@example.com", "password123", {
      subject: "Welcome",
      sender: "noreply@example.com",
    }).then((messages) => {
      messages.forEach((msg) => {
        expect(msg.subject).to.include("Welcome");
      });
    });
  });
});
```

## API

### `cy.getMailMessages(address, password, filters?)`

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

**Returns:** Cypress Chainable that resolves to array of messages

## TypeScript Support

Types for `SearchFilters` are automatically available when you import the command:

```typescript
import type { SearchFilters } from "e2e-mail/cypress";

const filters: SearchFilters = {
  subject: "Welcome",
  sender: "test@example.com",
};
```
