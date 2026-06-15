import { test, expect } from "e2e-mail/playwright";

test.describe("Mail.tm Integration", () => {
  test("should fetch messages using getMailMessages fixture", async ({
    initializeMailbox,
    searchMailbox,
  }) => {
    await initializeMailbox("testingnewmailbox@web-library.net", "Pass1234");

    const message = await searchMailbox(
      {
        //subject: "Testing",
        recipient: "testingnewmailbox@web-library.net",
        sender: "09egrego@gmail.com",
        createdAfter: "2026-06-08T02:15:21+00:00",
      },
      { timeout: 30000 },
    );

    console.log(message);
  });
});
