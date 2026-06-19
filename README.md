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

### Cypress

```ts
describe("Mail.tm Integration", () => {
  it("should fetch messages using getMailMessages command", () => {
    cy.initializeMailbox("someusername@<valid-domain>", "Pass1234");

    /* Test script continues until app sends email */

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

    /* Most recent matching email DOM renders and assertions can be made against it */
  });
});
```

### Playwright

```ts
test.describe("Mail.tm Integration", () => {
  test("should fetch relevant message", async ({
    initializeMailbox,
    searchMailbox,
  }) => {
    await initializeMailbox("someusername@<valid-domain>", "Pass1234");

    /* Test script continues until app sends email */

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

    /* Most recent matching email DOM renders and assertions can be made against it */
  });
});
```

That's it... Seriously!

# Tips

### I have multiple tests sharing an inbox and want to uniquely identify their emails.

Email subaddressing is supported here. Add your unique identifier to your email like `test+<any-string-identifier>@example.com` and then

```ts
searchMailbox({
  recipient: "test+<any-string-identifier>@example.com",
  // ...additional filters
});
```
