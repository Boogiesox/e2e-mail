import type { SearchFilters } from "./mailtm";
import {
  createAccount,
  createToken,
  getMessage,
  getMessages,
} from "../api/mailtm-api";
import { filterMessages, validateEmailDomain } from "./utils";

export class E2EMailClient {
  private static readonly POLL_INTERVAL = 1000;
  private token: string | undefined;
  private address: string;
  private password: string;

  constructor(address: string, password: string) {
    this.address = address;
    this.password = password;
  }

  private async getAuth() {
    const auth = await createToken({
      address: this.address,
      password: this.password,
    });

    if (auth?.token) {
      this.token = auth.token;
    }
  }

  /** Initializes mailbox with existing credentials. If new and available account, it will be created automatically */
  public async initialize() {
    await this.getAuth();

    if (!this.token) {
      await validateEmailDomain(this.address);
      await createAccount({ address: this.address, password: this.password });
      await this.getAuth();
    }
  }

  /** Fetch and filter emails for the initialized mailbox and return most recent match */
  private async queryMessages(filters?: SearchFilters) {
    if (!this.token)
      throw new Error(
        `E2EMail - Searching mailbox ${this.address} failed.\n\nPassword is incorrect.`,
      );

    const allMessages = await getMessages(this.token);

    const [firstMatch = {}] = filterMessages(allMessages, filters);

    return await getMessage(this.token, firstMatch.id || "");
  }

  /** Poll for messages in the initialized mailbox and timeout */
  public async pollMessages(filters?: SearchFilters, timeout = 30000) {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      const message = await this.queryMessages(filters);

      if (message) {
        return message;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, E2EMailClient.POLL_INTERVAL),
      );
    }

    throw new Error(
      `E2E Mail - No matching messages found after ${timeout}ms.`,
    );
  }
}
