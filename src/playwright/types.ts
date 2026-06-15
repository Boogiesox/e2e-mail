import type { PollingOptions, SearchFilters } from "../core/mailtm/types";
import type { components } from "../core/api/types/mailtm-api";

type Message = components["schemas"]["Message-message.read"];

export type MailFixtures = {
  /**
   * Initialize mailbox session
   */
  initializeMailbox: (address: string, password: string) => Promise<void>;

  /**
   * Get most recent inbox match for an existing or new mail account
   */
  searchMailbox: (
    filters?: SearchFilters,
    options?: PollingOptions,
  ) => Promise<Message>;

  /**
   * Delete the account mailbox and all its emails from the server
   */
  removeMailbox: () => Promise<void>;
};
