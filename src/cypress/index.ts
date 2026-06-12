import type { SearchFilters } from "../core/mailtm/mailtm";
import type { components } from "../core/api/mailtm-api.d";
import { getAccountMessages } from "../core/mailtm";

export type { SearchFilters } from "../core/mailtm/mailtm";
export { getAccountMessages } from "../core/mailtm";

type Message = components["schemas"]["Message-messages.read"];

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Get messages for an existing or new mail account
       * @param address Email address
       * @param password Account password
       * @param filters Optional search filters
       */
      getMailMessages(
        address: string,
        password: string,
        filters?: SearchFilters,
      ): Chainable<Message[]>;
    }
  }
}

Cypress.Commands.add("getMailMessages", (address, password, filters?) => {
  cy.log(`Fetching messages for ${address}`);
  return cy.then(() => getAccountMessages(address, password, filters));
});
