import { test as base } from "@playwright/test";
import type { SearchFilters } from "../core/mailtm/mailtm";
import type { components } from "../core/api/mailtm-api.d";
import { E2EMailClient } from "../core/mailtm";

type Message = components["schemas"]["Message-message.read"];

export type MailFixtures = {
  initializeMailbox: (address: string, password: string) => void;
  searchMailbox: (filters?: SearchFilters) => Promise<Message[]>;
};

let mailClient: E2EMailClient | undefined;

export const test = base.extend<MailFixtures>({
  initializeMailbox: async ({}, use) => {
    await use(async (address, password) => {
      mailClient = new E2EMailClient(address, password);
      await mailClient.initialize();
    });
  },

  searchMailbox: async ({}, use) => {
    await use(async (filters?: SearchFilters) => {
      if (!mailClient) {
        throw new Error(
          "Mailbox client not initialized. Call initializeMailbox() first.",
        );
      }

      return await mailClient.queryMessages(filters);
    });
  },
});

export { expect } from "@playwright/test";
