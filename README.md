<p align="center">
    <img width="256" height="256" alt="Screenshot 2026-06-19 at 1 16 02 AM" src="https://github.com/user-attachments/assets/171830fc-c2b9-4d94-ab6e-bda89c033364" />
</p>

<h2 align="center">
  Zero-config email testing for major E2E frameworks.
</h3>

<p align="center">
    🚫 API Key | 🚫 Monthly Bill | 🚫 Domain Purchase | 🚫 Self-Destructing Inboxes
</p>

<p align="center">
    ✅ Simply Free Email Testing
</p>

E2E Mail is on a mission to make email testing as simple, reliable, and accessible as the rest of your test suite.

Most email testing solutions require paid APIs, custom domains, inbox management, vendor lock-in, or usage limits that make scaling difficult for open source projects, startups, and individual developers. E2E Mail takes a different approach.

By leveraging free temporary email infrastructure behind a developer-friendly API, E2E Mail provides persistent, testable inboxes without the setup overhead. No accounts to create. No billing to configure. No DNS records to manage.

Whether you're testing account verification flows, password resets, magic links, invitations, or transactional emails, E2E Mail helps you validate real email delivery inside your end-to-end tests with just a few lines of code.

# Usage

```bash
npm i e2e-mail
```

### Overview
E2E Mail exposes a few core E2E functions:
```ts
initializeMailbox()
```
Creates a new, free mailbox or logs into an existing mailbox. The email passed here requires a valid domain. **@web-library.net** is the current, known valid domain, but that may change. This command will validate the email domain you pass and suggest valid alternatives in logging if invalid.


```ts
searchMailbox()
```
Gets the most recent mailbox item. Filters can be combined to narrow your search even further. This command has been adapted in the E2E implementations to also render the email DOM directly into the running test, allowing you to selecte and assert in your chosen E2E framework like any other page.


```ts
removeMailbox()
```
Deletes the account. This is strongly suggested for signup flows where accounts are created programmatically and reuse is not intended (e.g. include a uniqe ID or timestamp). This helps maintain good citizenship of the free, backing email infrastructure.

### Cypress

```ts
import "e2e-mail/cypress"; // Or globally wherever you import commands

describe("Mail.tm Integration", () => {
  it("fetches the most recent and relevant message", () => {
    /* STEP 1 */
    cy.initializeMailbox("someusername@<valid-domain>", "Pass1234");

    /* Test script continues until app sends email */

    /* STEP 2 */
    cy.searchMailbox(
      {
          subject: "", // Optional - Subject Filter
          recipient: "", // Optional - Recipient Filter
          sender: "", // Optional - Sender Filter
          createdAfter: "", // - Optional Min Date Filter
      },
      {
          timeout: 15000 // Optional - How long to poll for a match
          autoDelete: false // Optional - Delete after fetching (Defaults true)
      },
    );

    /* STEP 3 (OPTIONAL) */
    cy.removeMailbox()

    /* Renders email DOM accepting assertions and interactions */
  });
});
```

### Playwright

```ts
import { test, expect } from "e2e-mail/playwright";

test.describe("Mail.tm Integration", () => {
  test("fetches the most recent and relevant message", async ({
    initializeMailbox,
    searchMailbox,
    removeMailbox
  }) => {
    /* STEP 1 */
    await initializeMailbox("someusername@<valid-domain>", "Pass1234");

    /* Test script continues until app sends email */

    /* STEP 2 */
    await searchMailbox(
      {
          subject: "", // Optional - Subject Filter
          recipient: "", // Optional - Recipient Filter
          sender: "", // Optional - Sender Filter
          createdAfter: "", // - Optional Min Date Filter
      },
      {
          timeout: 15000 // Optional - How long to poll for a match
          autoDelete: false // Optional - Delete after fetching (Defaults true)
      },
    );

    /* STEP 3 (OPTIONAL) */
    await removeMailbox()

    /* Renders email DOM accepting assertions and interactions */
  });
});
```

That's it... Seriously!

# Tips

### I have multiple tests sharing an inbox and want to uniquely identify their emails.

Email subaddressing is supported here. Add your unique identifier to your email like `test+<any-string-identifier>@example.com` and then:

```ts
searchMailbox({
  recipient: "test+<any-string-identifier>@example.com",
  // ...additional filters
});
```

### My testing framework isn't in here
Cypress and Playwright currently have first-class support. However, the core client is also provided if you'd prefer to build your own framework extensions or plugins:

```ts
import { E2EMailClient } from "e2e-mail";

const client = new E2EMailClient('test@example.com', "Pass1234");

client.initialize()
client.pollMessages()
client.displose()
```
