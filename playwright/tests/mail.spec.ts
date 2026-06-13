import { test, expect } from "../../src/playwright";

test.describe("Mail.tm Integration", () => {
  test("should fetch messages using getMailMessages fixture", async ({
    initializeMailbox,
    searchMailbox,
  }) => {
    await initializeMailbox("test-ing@web-library.net", "Pass1234");

    const messages = await searchMailbox({
      subject: "SpaceX",
      recipient: "test-ing+123456@web-library.net",
      sender: "09egrego@gmail.com",
      createdAfter: "2026-06-09T03:49:21+00:00",
    });

    expect(Array.isArray(messages)).toBe(true);

    console.log(messages);
  });
});
