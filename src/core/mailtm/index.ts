import {
  createAccount,
  deleteAccount,
  createToken,
  getMessage,
  getMessages,
  getMe,
  deleteMessage,
} from "../api/mailtm-api";
import type { PollingOptions, SearchFilters } from "./types";
import { filterMessages, validateEmailDomain } from "./utils";

export class E2EMailClient {
  private static readonly POLL_INTERVAL = 1000;
  private address: string;
  private password: string;
  private token: string | undefined;
  private accountId: string | undefined;

  constructor(address: string, password: string) {
    this.address = address;
    this.password = password;
  }

  private async login() {
    const { data: auth } = await createToken({
      address: this.address,
      password: this.password,
    });

    if (auth?.token) {
      const { data: account } = await getMe(auth.token);

      this.token = auth.token;
      this.accountId = account?.id;
    }
  }

  /** Initializes mailbox with existing credentials. If new and available account, it will be created automatically */
  public async initialize() {
    await this.login();

    if (!this.token) {
      await validateEmailDomain(this.address);
      const { error: { detail = "" } = {} } = await createAccount({
        address: this.address,
        password: this.password,
      });

      if (detail)
        throw new Error(`E2E Mail - Failed to create Account.\n${detail}`);

      await this.login();
    }
  }

  public async dispose() {
    if (!this.token || !this.accountId)
      throw new Error(
        `E2EMail - Deleting mailbox ${this.address} failed.\n\nPassword is incorrect or account doesn't exist.`,
      );

    return await deleteAccount(this.token, this.accountId);
  }

  /** Fetch and filter emails for the initialized mailbox and return most recent match */
  private async queryMessages(filters?: SearchFilters) {
    if (!this.token)
      throw new Error(
        `E2EMail - Searching mailbox ${this.address} failed.\n\nPassword is incorrect.`,
      );

    const { data: allMessages } = await getMessages(this.token);
    const [firstMatch] = filterMessages(allMessages, filters);

    if (firstMatch) {
      const { data } = await getMessage(this.token, firstMatch?.id || "");
      return data;
    }

    return;
  }

  /** Poll for messages in the initialized mailbox and timeout */
  public async pollMessages(
    filters?: SearchFilters,
    { timeout = 30000, autoDelete = true }: PollingOptions = {},
  ) {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      const message = await this.queryMessages(filters);

      if (message) {
        if (autoDelete && this.token && message.id) {
          await deleteMessage(this.token, message.id);
        }

        return message;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, E2EMailClient.POLL_INTERVAL),
      );
    }

    throw new Error(
      `E2E Mail - No message matching your criteria found found after ${timeout}ms.`,
    );
  }
}
