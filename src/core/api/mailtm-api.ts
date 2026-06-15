import createClient from "openapi-fetch";
import type { paths } from "./types/mailtm-api";
import type { RequestPayload } from "./types";

/** OpenAPI client for MailTM */
const client = createClient<paths>({
  baseUrl: "https://api.mail.tm",
});

/**********
 * DOMAIN *
 *********/
export async function getDomains() {
  const { data = [], error } = await client.GET("/domains", {
    headers: {
      Accept: "application/json",
    },
  });

  return { data, error };
}

/***********
 * ACCOUNT *
 **********/
export async function createAccount({
  address,
  password,
}: RequestPayload<"api_accounts_post">) {
  const { data, error } = await client.POST("/accounts", {
    headers: {
      Accept: "application/json",
    },
    body: {
      address,
      password,
    },
  });

  return { data, error };
}

export async function getMe(token: string) {
  const { data, error } = await client.GET("/me", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return { data, error };
}

export async function deleteAccount(token: string, id: string) {
  const { data, error } = await client.DELETE("/accounts/{id}", {
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

  return { data, error };
}

/*********
 * TOKEN *
 ********/
export async function createToken({
  address,
  password,
}: RequestPayload<"login_check_post">) {
  const { data, error } = await client.POST("/token", {
    headers: {
      Accept: "application/json",
    },
    body: {
      address,
      password,
    },
  });

  return { data, error };
}

/************
 * MESSAGES *
 ***********/
export async function getMessages(token: string) {
  const { data, error } = await client.GET("/messages", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return { data, error };
}

export async function getMessage(token: string, id: string) {
  const { data, error } = await client.GET("/messages/{id}", {
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

  return { data, error };
}

export async function deleteMessage(token: string, id: string) {
  const { data, error } = await client.DELETE("/messages/{id}", {
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

  return { data, error };
}

/**********
 * SOURCE *
 *********/
export async function getSource(token: string, id: string) {
  const { data, error } = await client.GET("/sources/{id}", {
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

  return { data, error };
}
