import { test as base } from "@playwright/test";
import type { SearchFilters } from "../core/mailtm/mailtm";
import type { components } from "../core/api/mailtm-api.d";
import { E2EMailClient } from "../core/mailtm";

type Message = components["schemas"]["Message-message.read"];

export type MailFixtures = {
  /**
   * Initialize mailbox session
   * @param address Email address
   * @param password Account password
   */
  initializeMailbox: (address: string, password: string) => void;

  /**
   * Get latest inbox match for an existing or new mail account
   * @param filters Optional search filters
   * @param options Configuration for message polling
   */
  searchMailbox: (
    filters?: SearchFilters,
    options?: { timeout?: number },
  ) => Promise<Message>;
};

let mailClient: E2EMailClient | undefined;

export const test = base.extend<MailFixtures>({
  initializeMailbox: async ({}, use) => {
    await use(async (address, password) => {
      mailClient = new E2EMailClient(address, password);
      await mailClient.initialize();
    });
  },

  searchMailbox: async ({ page }, use) => {
    await use(async (filters, options = {}) => {
      const { timeout = test.info().project.use.actionTimeout ?? 4000 } =
        options;

      if (!mailClient) {
        throw new Error(
          "Mailbox client not initialized. Call initializeMailbox() first.",
        );
      }

      const message = await mailClient.pollMessages(filters, timeout);
      const html = message.html?.[0] ?? message.html ?? "";

      if (html) {
        await page.setContent(String(html));
      }

      return message;
    });
  },
});

export { expect } from "@playwright/test";
