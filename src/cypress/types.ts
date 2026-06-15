import type { PollingOptions, SearchFilters } from "../core/mailtm/types";
import type { components } from "../core/api/types/mailtm-api";

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
      ): Chainable<Message>;

      /**
       * Delete the account mailbox and all its emails from the server
       */
      removeMailbox(): Chainable<void>;
    }
  }
}

export {};
