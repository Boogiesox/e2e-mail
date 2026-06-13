import type { SearchFilters } from "./mailtm";
import { createAccount, createToken, getMessages } from "../api/mailtm-api";
import { filterMessages, validateEmailDomain } from "./utils";

export class E2EMailClient {
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

  /** Fetch and filter emails for the initialized mailbox */
  public async queryMessages(filters?: SearchFilters) {
    if (!this.token) throw new Error("Error fetching messages: auth missing");

    const allMessages = await getMessages(this.token);

    return filterMessages(allMessages, filters);
  }
}
