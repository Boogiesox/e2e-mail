import { test, expect } from "../fixtures/mail";

test.describe("Mail.tm Integration", () => {
  test("should fetch messages using getMailMessages fixture", async ({
    getMailMessages,
  }) => {
    const messages = await getMailMessages(
      "test-ing@web-library.net",
      "Pass1234",
      {
        subject: "SpaceX",
        recipient: "test-ing+123456@web-library.net",
        sender: "09egrego@gmail.com",
        createdAfter: "2026-06-09T03:49:21+00:00",
      },
    );

    expect(messages).toBeDefined();
    expect(Array.isArray(messages)).toBe(true);

    console.log(messages);
  });
});
