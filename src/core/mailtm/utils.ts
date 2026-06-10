import { getDomains } from "../api/mailtm-api";

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
      `@${domain} cannot be used with mail.tm.\nActive domains: ${activeDomains.join(", ")}`,
    );
  }

  return domainMatch;
};
