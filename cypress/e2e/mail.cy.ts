describe("Mail.tm Integration", () => {
  it("should fetch messages using getMailMessages command", () => {
    cy.getMailMessages("test-ing@web-library.net", "Pass1234", {
      subject: "SpaceX",
      recipient: "test-ing+123456@web-library.net",
      sender: "09egrego@gmail.com",
      createdAfter: "2026-06-09T03:49:21+00:00",
    }).then((messages) => {
      expect(messages).to.be.an("array");

      console.log(messages);
    });
  });
});
