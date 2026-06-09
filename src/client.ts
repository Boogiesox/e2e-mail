import createClient from "openapi-fetch";
import type { paths } from "./mailtm.d";

export const client = createClient<paths>({
  baseUrl: "https://api.mail.tm",
});
