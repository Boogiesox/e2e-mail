import { E2EMailClient } from "../core/mailtm";
import "./types";

let mailClient: E2EMailClient | null = null;

Cypress.Commands.add("initializeMailbox", (address, password) => {
  cy.log(`Creating mailbox ${address}`);

  return cy.then(async () => {
    mailClient = new E2EMailClient(address, password);
    await mailClient.initialize();
  });
});

Cypress.Commands.add("removeMailbox", () => {
  return cy.then(async () => {
    if (!mailClient) {
      throw new Error(
        "Mailbox client not initialized. Call cy.initializeMailbox() first.",
      );
    }

    await mailClient.dispose();
  });
});

Cypress.Commands.add("searchMailbox", (filters, options = {}) => {
  const {
    timeout = Cypress.config().defaultCommandTimeout ?? 4000,
    autoDelete,
  } = options;

  return cy.then({ timeout: timeout + 1000 }, async () => {
    if (!mailClient) {
      throw new Error(
        "Mailbox client not initialized. Call cy.initializeMailbox() first.",
      );
    }

    // Get most recent match
    const message = await mailClient.pollMessages(filters, {
      timeout,
      autoDelete,
    });
    const html = Array.isArray(message.html) ? message.html[0] : message.html;

    // Write HTML to Cypress DOM
    if (html) {
      cy.document().then((doc) => {
        doc.open();
        doc.write(String(html));
        doc.close();
      });
    }

    return message;
  });
});
