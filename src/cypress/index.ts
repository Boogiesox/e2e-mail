import type { SearchFilters } from "../core/mailtm/mailtm";
import type { components } from "../core/api/mailtm-api.d";
import { E2EMailClient } from "../core/mailtm";

export type { SearchFilters } from "../core/mailtm/mailtm";

type Message = components["schemas"]["Message-message.read"];

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Initialize mailbox session
       * @param address Email address
       * @param password Account password
       */
      initializeMailbox(address: string, password: string): void;

      /**
       * Get most recent inbox match for an existing or new mail account
       * @param filters Optional search filters
       * @param options Configuration for message polling
       */
      searchMailbox(
        filters?: SearchFilters,
        options?: { timeout?: number },
      ): Chainable<Message>;

      renderEmail(message: Message): Chainable<void>;
    }
  }
}

let mailClient: E2EMailClient | null = null;

Cypress.Commands.add("initializeMailbox", (address, password) => {
  cy.log(`Creating mailbox ${address}`);

  return cy.then(async () => {
    mailClient = new E2EMailClient(address, password);
    await mailClient.initialize();
  });
});

Cypress.Commands.add("searchMailbox", (filters, options = {}) => {
  const { timeout = Cypress.config().defaultCommandTimeout ?? 4000 } = options;

  return cy.then({ timeout: timeout + 1000 }, async () => {
    if (!mailClient) {
      throw new Error(
        "Mailbox client not initialized. Call cy.initializeMailbox() first.",
      );
    }

    // Get most recent match
    const message = await mailClient.pollMessages(filters, timeout);
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
