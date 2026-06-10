import {
  createAccount,
  createToken,
  getDomains,
  getMessages,
} from "../api/mailtm-api";
import { validateEmailDomain } from "./utils";

/** Gets messages for a given account. If the account doesn't exist, it will be created automatically. */
export async function getAccountMessages(credentials: {
  address: string;
  password: string;
}) {
  const { address, password } = credentials;

  // Attempt to authenticate with the provided credentials
  const auth = await createToken({
    address,
    password,
  });

  // If authentication fails, check for domain validity, create the account, and fetch again
  if (!auth?.token) {
    validateEmailDomain(address);

    await createAccount({
      address,
      password,
    });

    return getAccountMessages(credentials);
  }

  return await getMessages(auth.token);
}
