describe("Mail.tm Integration", () => {
  it("should fetch messages using getMailMessages command", () => {
    cy.initializeMailbox("test-ing@web-library.net", "Pass1234");

    cy.searchMailbox({
      subject: "SpaceX",
      recipient: "test-ing+123456@web-library.net",
      sender: "09egrego@gmail.com",
      createdAfter: "2026-06-09T03:49:21+00:00",
    }).then((messages: any[]) => {
      expect(messages).to.be.an("array");

      console.log(messages);
    });
  });
});
