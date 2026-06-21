import { E2EMailClient } from "../core/mailtm";
import type { PollingOptions, SearchFilters } from "../core/mailtm/types";

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

  cy.then(async () => {
    const client = new E2EMailClient(address, password);
    await client.initialize();

    cy.wrap(client, { log: false }).as("mailClient");
  });
});

Cypress.Commands.add("removeMailbox", () => {
  cy.get<E2EMailClient>("@mailClient").then(async (client) => {
    if (!client) {
      throw new Error(
        "Mailbox client not initialized. Call cy.initializeMailbox() first.",
      );
    }

    return client.dispose();
  });
});

Cypress.Commands.add("searchMailbox", (filters, options = {}) => {
  const {
    timeout = Cypress.config().defaultCommandTimeout ?? 4000,
    autoDelete,
  } = options;

  // Get most recent match
  cy.get<E2EMailClient>("@mailClient", { timeout: timeout + 2000 }).then(
    (client) => {
      return cy.then({ timeout: timeout + 2000 }, async () => {
        if (!client) {
          throw new Error(
            "Mailbox client not initialized. Call cy.initializeMailbox() first.",
          );
        }

        const message = await client.pollMessages(filters, {
          timeout,
          autoDelete,
        });

        const html = Array.isArray(message.html)
          ? message.html[0]
          : message.html;

        // Write HTML to Cypress DOM
        if (html) {
          cy.document().then((doc) => {
            doc.open();
            doc.write(String(html));
            doc.close();
          });
        }
      });
    },
  );
});
