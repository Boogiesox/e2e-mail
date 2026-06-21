import { test, expect } from "e2e-mail/playwright";

test.describe("Mail.tm Integration", () => {
  test("should fetch messages using getMailMessages fixture", async ({
    initializeMailbox,
    searchMailbox,
  }) => {
    await initializeMailbox("testingnewmailbox2@web-library.net", "Pass1234");

    const message = await searchMailbox(
      {
        //subject: "Testing",
        recipient: "testingnewmailbox2@web-library.net",
        sender: "09egrego@gmail.com",
        createdAfter: "2026-06-08T02:15:21+00:00",
      },
      { timeout: 15000 },
    );

    console.log(message);
  });
});
