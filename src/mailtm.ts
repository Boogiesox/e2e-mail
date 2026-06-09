import { client } from "./client";

const COMMON_CONFIG = {
  headers: {
    Accept: "application/json",
  },
};

export class MailTm {
  public async getActiveDomain() {
    const { data = [] } = await client.GET("/domains", COMMON_CONFIG);

    const domain = data.find((d) => d.isActive)?.domain;

    return domain;
  }

  public async createAccount({
    address,
    password,
  }: {
    address: string;
    password: string;
  }) {
    const { data } = await client.POST("/accounts", {
      ...COMMON_CONFIG,
      body: {
        address,
        password,
      },
    });

    return data;
  }

  public async getToken({
    address,
    password,
  }: {
    address: string;
    password: string;
  }) {
    const { data } = await client.POST("/token", {
      ...COMMON_CONFIG,
      body: {
        address,
        password,
      },
    });

    return data;
  }

  public async getMessages(token: string) {
    const { data } = await client.GET("/messages", {
      headers: {
        ...COMMON_CONFIG.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}
