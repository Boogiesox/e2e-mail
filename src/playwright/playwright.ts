import { test as base, expect, type TestType } from "@playwright/test"; // 1. Import TestType
import { E2EMailClient } from "../core/mailtm";
import type { PollingOptions, SearchFilters } from "../core/mailtm/types";

let mailClient: E2EMailClient | undefined;

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
  ) => Promise<void>;

  /**
   * Delete the account mailbox and all its emails from the server
   */
  removeMailbox: () => Promise<void>;
};

// 2. Explicitly type the "test" constant using TestType<MailFixtures>
export const test: TestType<MailFixtures, {}> = base.extend<MailFixtures>({
  initializeMailbox: async ({}, use) => {
    await use(async (address, password) => {
      mailClient = new E2EMailClient(address, password);
      await mailClient.initialize();
    });
  },
  removeMailbox: async ({}, use) => {
    await use(async () => {
      if (!mailClient) {
        throw new Error(
          "Mailbox client not initialized. Call initializeMailbox() first.",
        );
      }
      await mailClient.dispose();
    });
  },
  searchMailbox: async ({ page }, use) => {
    await use(async (filters, options = {}) => {
      const {
        timeout = test.info().project.use.actionTimeout ?? 4000,
        autoDelete,
      } = options;

      if (!mailClient) {
        throw new Error(
          "Mailbox client not initialized. Call initializeMailbox() first.",
        );
      }

      const message = await mailClient.pollMessages(filters, {
        timeout,
        autoDelete,
      });

      const html = message.html?.[0] ?? message.html ?? "";

      if (html) {
        await page.setContent(String(html));
      }
    });
  },
});

export { expect };
