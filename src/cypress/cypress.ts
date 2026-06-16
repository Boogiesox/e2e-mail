import { E2EMailClient } from "../core/mailtm";
import type { PollingOptions, SearchFilters } from "../core/mailtm/types";
import type { components } from "../core/api/types/mailtm-api";

let mailClient: E2EMailClient | null = null;

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
        options?: PollingOptions,
      ): Chainable<void>;

      /**
       * Delete the account mailbox and all its emails from the server
       */
      removeMailbox(): void;
    }
  }
}

Cypress.Commands.add("initializeMailbox", (address, password) => {
  cy.log(`Initializing mailbox ${address}`);

  mailClient = new E2EMailClient(address, password);
  mailClient.initialize();
});

Cypress.Commands.add("removeMailbox", () => {
  if (!mailClient) {
    throw new Error(
      "Mailbox client not initialized. Call cy.initializeMailbox() first.",
    );
  }

  mailClient.dispose();
});

Cypress.Commands.add("searchMailbox", (filters, options = {}) => {
  const {
    timeout = Cypress.config().defaultCommandTimeout ?? 4000,
    autoDelete,
  } = options;

  cy.wrap(async () => {
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
