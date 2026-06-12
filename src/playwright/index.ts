import { test as base } from "@playwright/test";
import type { SearchFilters } from "../core/mailtm/mailtm";
import type { components } from "../core/api/mailtm-api.d";
import { getAccountMessages } from "../core/mailtm";

type Message = components["schemas"]["Message-messages.read"];

export type MailFixtures = {
  getMailMessages: (
    address: string,
    password: string,
    filters?: SearchFilters,
  ) => Promise<Message[]>;
};

export const test = base.extend<MailFixtures>({
  getMailMessages: async ({}, use) => {
    await use(
      async (address: string, password: string, filters?: SearchFilters) => {
        return getAccountMessages(address, password, filters);
      },
    );
  },
});

export { expect } from "@playwright/test";
