import { ResponseData } from "../api";
import { getDomains } from "../api/mailtm-api";
import { SearchFilters } from "./mailtm";

/** Determines if passed email domain matches any active domains from mail.tm, fail if not
 * @remarks This is intentionally bypassed if a token was successfully created for a previously established account whose domain was deactivated
 * @param address The email address for which to check domain validitity
 */
export const validateEmailDomain = async (address: string) => {
  const domains = await getDomains();
  const domain = address.split("@")[1];
  const activeDomains = domains.filter((d) => d.isActive).map((d) => d.domain);
  const domainMatch = activeDomains.find((d) => d === domain);

  if (!domainMatch) {
    throw new Error(
      `E2E Mail - Domain @${domain} cannot be used to initialize mailbox.\n\nTry again with one of the following domains: ${activeDomains.join(", ")}`,
    );
  }

  return domainMatch;
};

/** Search and filter account messages by message metadata or content
 * @param messages The messages returned from the account to filter
 * @param filters The filtering criteria to apply to the messages
 */
export function filterMessages(
  messages: ResponseData<"api_messages_get_collection", 200> = [],
  filters?: SearchFilters,
) {
  if (!filters) return messages;

  const predicates: Array<
    (message: ResponseData<"api_messages_id_get", 200>) => boolean
  > = [];

  if (filters.recipient) {
    predicates.push((message) =>
      (message.to as any[])?.some(
        ({ address }) => address === filters.recipient,
      ),
    );
  }

  if (filters.sender) {
    predicates.push(
      (message) => (message.from as any)?.address === filters.sender,
    );
  }

  if (filters.subject) {
    const regex = new RegExp(filters.subject, "i");
    predicates.push((message) => regex.test(message.subject ?? ""));
  }

  if (filters.createdAfter) {
    const startTime = Date.parse(filters.createdAfter);
    predicates.push(
      (message) => Date.parse(message.createdAt ?? "") > startTime,
    );
  }

  return messages.filter((message) =>
    predicates.every((predicate) => predicate(message)),
  );
}
