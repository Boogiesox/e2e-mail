import { test as base, expect, TestType } from "@playwright/test";
import { E2EMailClient } from "../core/mailtm";
import type { PollingOptions, SearchFilters } from "../core/mailtm/types";

type MailState = {
  client?: E2EMailClient;
};

export type MailFixtures = {
  /**
   * Initialize mailbox session
   * @param address Email address
   * @param password Account password
   */
  initializeMailbox: (address: string, password: string) => Promise<void>;

  /**
   * Get most recent inbox match for an existing or new mail account
   * @param filters Optional search filters
   * @param options Configuration for message polling
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

type InternalFixtures = {
  mailState: MailState;
};

export const test: TestType<MailFixtures, {}> = base.extend<
  MailFixtures & InternalFixtures
>({
  mailState: async ({}, use) => {
    const state: MailState = {};

    await use(state);
  },

  initializeMailbox: async ({ mailState }, use) => {
    await use(async (address, password) => {
      const client = new E2EMailClient(address, password);

      await client.initialize();

      mailState.client = client;
    });
  },

  removeMailbox: async ({ mailState }, use) => {
    await use(async () => {
      if (!mailState.client) {
        throw new Error(
          "Mailbox client not initialized. Call initializeMailbox() first.",
        );
      }

      await mailState.client.dispose();
      mailState.client = undefined;
    });
  },

  searchMailbox: async ({ page, mailState }, use) => {
    await use(async (filters, options = {}) => {
      const {
        timeout = test.info().project.use.actionTimeout ?? test.info().timeout,
        autoDelete,
      } = options;

      const client = mailState.client;

      if (!client) {
        throw new Error(
          "Mailbox client not initialized. Call initializeMailbox() first.",
        );
      }

      const message = await client.pollMessages(filters, {
        timeout,
        autoDelete,
      });

      const html = Array.isArray(message.html)
        ? message.html[0]
        : (message.html ?? "");

      if (html) {
        await page.setContent(String(html));
      }
    });
  },
});

export { expect };
