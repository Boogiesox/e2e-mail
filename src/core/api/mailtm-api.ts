import createClient from "openapi-fetch";
import type { paths } from "../api/mailtm-api.d";
import type { RequestPayload } from ".";

/** OpenAPI client for MailTM */
const client = createClient<paths>({
  baseUrl: "https://api.mail.tm",
});

// Domain
export async function getDomains() {
  const { data = [] } = await client.GET("/domains", {
    headers: {
      Accept: "application/json",
    },
  });

  return data;
}

// Account
export async function createAccount({
  address,
  password,
}: RequestPayload<"api_accounts_post">) {
  const { data } = await client.POST("/accounts", {
    headers: {
      Accept: "application/json",
    },
    body: {
      address,
      password,
    },
  });

  return data;
}

// Token
export async function createToken({
  address,
  password,
}: RequestPayload<"login_check_post">) {
  const { data } = await client.POST("/token", {
    headers: {
      Accept: "application/json",
    },
    body: {
      address,
      password,
    },
  });

  return data;
}

// Messages
export async function getMessages(token: string) {
  const { data } = await client.GET("/messages", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

// Source
export async function getSource(token: string, id: string) {
  const { data } = await client.GET("/sources/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
