describe("Mail.tm Integration", () => {
  it("should fetch messages using getMailMessages command", () => {
    cy.initializeMailbox("testingnewmailbox@web-library.net", "Pass1234");

    cy.searchMailbox(
      {
        //subject: "Testing",
        recipient: "testingnewmailbox@web-library.net",
        sender: "09egrego@gmail.com",
        createdAfter: "2026-06-08T02:15:21+00:00",
      },
      { timeout: 15000 },
    );
  });
});
