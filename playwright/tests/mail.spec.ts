import { test, expect } from "../../src/playwright";

test.describe("Mail.tm Integration", () => {
  test("should fetch messages using getMailMessages fixture", async ({
    initializeMailbox,
    searchMailbox,
    page,
  }) => {
    await initializeMailbox("test-ing@web-library.net", "Pass1234");

    const messages = await searchMailbox(
      {
        subject: "Testing",
        recipient: "test-ing+123456@web-library.net",
        sender: "09egrego@gmail.com",
        createdAfter: "2026-06-09T02:25:21+00:00",
      },
      { timeout: 30000 },
    );

    console.log(messages);
  });
});
