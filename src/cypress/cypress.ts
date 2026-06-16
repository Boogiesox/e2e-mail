import { E2EMailClient } from "../core/mailtm";
import type { PollingOptions, SearchFilters } from "../core/mailtm/types";

let mailClient: E2EMailClient | null = null;
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Initialize mailbox session
       * @param address Email address
       * @param password Account password
       */
      initializeMailbox(address: string, password: string): Chainable<void>;

      /**
       * Get most recent inbox match for an existing or new mail account
       * @param filters Optional search filters
       * @param options Configuration for message polling
       */
      searchMailbox(
        filters?: SearchFilters,
        options?: PollingOptions,
      ): Chainable<void>;

      /**
       * Delete the account mailbox and all its emails from the server
       */
      removeMailbox(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("initializeMailbox", (address, password) => {
  cy.log(`Initializing mailbox ${address}`);

  cy.then(() => {
    mailClient = new E2EMailClient(address, password);
    return mailClient.initialize();
  });
});

Cypress.Commands.add("removeMailbox", () => {
  cy.then(() => {
    if (!mailClient) {
      throw new Error(
        "Mailbox client not initialized. Call cy.initializeMailbox() first.",
      );
    }

    return mailClient.dispose();
  });
});

Cypress.Commands.add("searchMailbox", (filters, options = {}) => {
  const {
    timeout = Cypress.config().defaultCommandTimeout ?? 4000,
    autoDelete,
  } = options;

  return cy.then({ timeout: timeout + 2000 }, async () => {
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
  });
});
