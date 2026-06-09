import createClient from "openapi-fetch";
import type { paths } from "../api/mailtm-api.d";

/** OpenAPI client for MailTM generated with openapi-fetch */
export const client = createClient<paths>({
  baseUrl: "https://api.mail.tm",
});
