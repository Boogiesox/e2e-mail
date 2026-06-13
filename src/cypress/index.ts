import type { SearchFilters } from "../core/mailtm/mailtm";
import type { components } from "../core/api/mailtm-api.d";
import { E2EMailClient } from "../core/mailtm";

export type { SearchFilters } from "../core/mailtm/mailtm";

type Message = components["schemas"]["Message-messages.read"];

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Get messages for an existing or new mail account
       * @param address Email address
       * @param password Account password
       */
      initializeMailbox(address: string, password: string): void;

      /**
       * Get messages for an existing or new mail account
       * @param filters Optional search filters
       */
      searchMailbox(filters?: SearchFilters): Chainable<Message[]>;
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

Cypress.Commands.add("searchMailbox", (filters?: SearchFilters) => {
  return cy.then(async () => {
    if (!mailClient) {
      throw new Error(
        "Mailbox client not initialized. Call cy.initializeMailbox() first.",
      );
    }

    return await mailClient.queryMessages(filters);
  });
});
