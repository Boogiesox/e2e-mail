import type { ResponseData } from "../api";
import type { SearchFilters } from "./mailtm";
import {
  createAccount,
  createToken,
  getMessages,
  getSource,
} from "../api/mailtm-api";
import { filterMessages, validateEmailDomain } from "./utils";

/** Gets messages flow for given account credentials.
 * @remarks If the account doesn't exist, it will be created automatically.
 */
export async function getAccountMessages(
  /** Email address of new or existing account */
  address: string,
  /** Password of existing account or chosen password for new account */
  password: string,
  /** Filtering criteria for narrowing the returned result set  */
  filters?: SearchFilters,
) {
  // Attempt to authenticate with the provided credentials
  const auth = await createToken({
    address,
    password,
  });

  // If authentication fails, check for domain validity, auto-create the account, and recurse
  if (!auth?.token) {
    validateEmailDomain(address);

    await createAccount({
      address,
      password,
    });

    return getAccountMessages(address, password, filters);
  }

  // Fetch and filter messages
  const allMessages = await getMessages(auth.token);
  const filteredMessages = filterMessages(allMessages, filters);

  return filteredMessages;
}
