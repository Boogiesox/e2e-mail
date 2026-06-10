import type { ResponseData } from "../api";
import type { SearchFilters } from "./mailtm.d";
import { createAccount, createToken, getMessages } from "../api/mailtm-api";
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

/** Search and filter account messages by message metadata or content */
export function searchAccountMessages(
  messages: ResponseData<"api_messages_get_collection", 200> = [],
  filters: SearchFilters,
) {
  let filteredMessages = messages;
  const { subject, recipient, sender, createdAfter } = filters;

  if (recipient) {
    filteredMessages = filteredMessages.filter((message) => {
      console.log(message.to);
      return message.to?.some(({ address }) => address === recipient);
    });
  }

  if (subject) {
    filteredMessages = filteredMessages.filter((message) =>
      message.subject?.match(new RegExp(subject)),
    );
  }

  if (sender) {
    filteredMessages = filteredMessages.filter(
      (message) => message.from?.address === sender,
    );
  }

  if (createdAfter) {
    filteredMessages = filteredMessages.filter((message) => {
      const startDate = new Date(createdAfter).getTime();
      const messageDate = new Date(message.createdAt ?? "").getTime();

      return messageDate > startDate;
    });
  }

  return filteredMessages;
}
