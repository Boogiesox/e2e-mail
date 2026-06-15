export interface paths {
  "/accounts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Creates a Account resource.
     * @description Creates a Account resource.
     */
    post: operations["api_accounts_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/accounts/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Retrieves a Account resource.
     * @description Retrieves a Account resource.
     */
    get: operations["api_accounts_id_get"];
    put?: never;
    post?: never;
    /**
     * Removes the Account resource.
     * @description Removes the Account resource.
     */
    delete: operations["api_accounts_id_delete"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/domains": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Retrieves the collection of Domain resources.
     * @description Retrieves the collection of Domain resources.
     */
    get: operations["api_domains_get_collection"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/domains/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Retrieves a Domain resource.
     * @description Retrieves a Domain resource.
     */
    get: operations["api_domains_id_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/me": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Retrieves a Account resource.
     * @description Retrieves a Account resource.
     */
    get: operations["api_me_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/messages": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Retrieves the collection of Message resources.
     * @description Retrieves the collection of Message resources.
     */
    get: operations["api_messages_get_collection"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/messages/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Retrieves a Message resource.
     * @description Retrieves a Message resource.
     */
    get: operations["api_messages_id_get"];
    put?: never;
    post?: never;
    /**
     * Removes the Message resource.
     * @description Removes the Message resource.
     */
    delete: operations["api_messages_id_delete"];
    options?: never;
    head?: never;
    /**
     * Updates the Message resource.
     * @description Updates the Message resource.
     */
    patch: operations["api_messages_id_patch"];
    trace?: never;
  };
  "/messages/{id}/attachment/{attachmentId}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Retrieves a Message resource.
     * @description Retrieves a Message resource.
     */
    get: operations["attachment"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/messages/{id}/download": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Download a Message resource.
     * @description Retrieves a Message resource.
     */
    get: operations["download"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/sources/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Retrieves a Source resource.
     * @description Retrieves a Source resource.
     */
    get: operations["api_sources_id_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/token": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Creates a user token.
     * @description Creates a user token.
     */
    post: operations["login_check_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    "Account-account.read": {
      readonly id?: string;
      /** Format: email */
      address: string;
      quota?: number;
      used?: number;
      isDisabled?: boolean;
      isDeleted?: boolean;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
    };
    "Account-account.write": {
      readonly id?: string;
      /** Format: email */
      address: string;
      password?: string;
    };
    "Account.jsonapi": {
      data?: {
        id: string;
        type: string;
        attributes?: {
          readonly _id?: string;
          /** Format: email */
          address: string;
          password?: string;
          readonly quota?: number;
          readonly used?: number;
          readonly isDisabled?: boolean;
          readonly isDeleted?: boolean;
          /** Format: date-time */
          readonly createdAt?: string;
          /** Format: date-time */
          readonly updatedAt?: string;
        };
      };
    };
    "Account.jsonhal-account.read": {
      _links?: {
        self?: {
          /** Format: iri-reference */
          href?: string;
        };
      };
      readonly id?: string;
      /** Format: email */
      address: string;
      quota?: number;
      used?: number;
      isDisabled?: boolean;
      isDeleted?: boolean;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
    };
    "Account.jsonhal-account.write": {
      _links?: {
        self?: {
          /** Format: iri-reference */
          href?: string;
        };
      };
      readonly id?: string;
      /** Format: email */
      address: string;
      password?: string;
    };
    "Account.jsonld-account.read": {
      readonly "@context"?:
        | string
        | ({
            "@vocab": string;
            /** @enum {string} */
            hydra: "http://www.w3.org/ns/hydra/core#";
          } & {
            [key: string]: unknown;
          });
      readonly "@id"?: string;
      readonly "@type"?: string;
      readonly id?: string;
      /** Format: email */
      address: string;
      quota?: number;
      used?: number;
      isDisabled?: boolean;
      isDeleted?: boolean;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
    };
    "Account.jsonld-account.write": {
      readonly id?: string;
      /** Format: email */
      address: string;
      password?: string;
    };
    "Account.jsonopenapi-account.read": {
      readonly id?: string;
      /** Format: email */
      address: string;
      quota?: number;
      used?: number;
      isDisabled?: boolean;
      isDeleted?: boolean;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
    };
    "Account.jsonopenapi-account.write": {
      readonly id?: string;
      /** Format: email */
      address: string;
      password?: string;
    };
    Domain: {
      readonly id?: string;
      domain?: string;
      isActive?: boolean;
      isPrivate?: boolean;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
    };
    "Domain.jsonapi": {
      data?: {
        id: string;
        type: string;
        attributes?: {
          readonly _id?: string;
          domain?: string;
          isActive?: boolean;
          isPrivate?: boolean;
          /** Format: date-time */
          createdAt?: string;
          /** Format: date-time */
          updatedAt?: string;
        };
      };
    };
    "Domain.jsonhal": {
      _links?: {
        self?: {
          /** Format: iri-reference */
          href?: string;
        };
      };
      readonly id?: string;
      domain?: string;
      isActive?: boolean;
      isPrivate?: boolean;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
    };
    "Domain.jsonld": {
      readonly "@id"?: string;
      readonly "@type"?: string;
      readonly "@context"?:
        | string
        | ({
            "@vocab": string;
            /** @enum {string} */
            hydra: "http://www.w3.org/ns/hydra/core#";
          } & {
            [key: string]: unknown;
          });
      readonly id?: string;
      domain?: string;
      isActive?: boolean;
      isPrivate?: boolean;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
    };
    "Domain.jsonopenapi": {
      readonly id?: string;
      domain?: string;
      isActive?: boolean;
      isPrivate?: boolean;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
    };
    "Message-message.read": {
      readonly id?: string;
      msgid?: string;
      /**
       * @example {
       *       "address": "from@example.com",
       *       "name": "John Doe"
       *     }
       */
      from?: unknown;
      /**
       * @example [
       *       {
       *         "address": "receiver@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      to?: unknown[][];
      /**
       * @example [
       *       {
       *         "address": "cc@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      cc?: unknown[][];
      /**
       * @example [
       *       {
       *         "address": "bcc@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      bcc?: unknown[][];
      subject?: string;
      intro?: string;
      seen?: boolean;
      flagged?: boolean;
      isDeleted?: boolean;
      verifications?: string[];
      retention?: boolean;
      /** Format: date-time */
      retentionDate?: string;
      text?: string;
      html?: string[];
      hasAttachments?: boolean;
      /**
       * @example [
       *       {
       *         "id": "ATTACH000001",
       *         "filename": "happy.png",
       *         "contentType": "image/png",
       *         "disposition": "attachment",
       *         "transferEncoding": "base64",
       *         "related": false,
       *         "size": 666,
       *         "downloadUrl": "/messages/id/attachment/ATTACH000001"
       *       }
       *     ]
       */
      attachments?: unknown[][];
      size?: number;
      downloadUrl?: string;
      sourceUrl?: string | null;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
      /**
       * Format: iri-reference
       * @example https://example.com/
       */
      accountId?: string;
    };
    "Message-message.write": {
      seen?: boolean;
    };
    "Message-messages.read": {
      readonly id?: string;
      msgid?: string;
      /**
       * @example {
       *       "address": "from@example.com",
       *       "name": "John Doe"
       *     }
       */
      from?: unknown;
      /**
       * @example [
       *       {
       *         "address": "receiver@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      to?: unknown[][];
      subject?: string;
      intro?: string;
      seen?: boolean;
      isDeleted?: boolean;
      hasAttachments?: boolean;
      size?: number;
      downloadUrl?: string;
      sourceUrl?: string | null;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
      /**
       * Format: iri-reference
       * @example https://example.com/
       */
      accountId?: string;
    };
    "Message.jsonapi": {
      data?: {
        id: string;
        type: string;
        attributes?: {
          readonly _id?: string;
          readonly msgid?: string;
          /**
           * @example {
           *       "address": "from@example.com",
           *       "name": "John Doe"
           *     }
           */
          readonly from?: unknown;
          /**
           * @example [
           *       {
           *         "address": "receiver@example.com",
           *         "name": "John Doe"
           *       }
           *     ]
           */
          readonly to?: unknown[][];
          /**
           * @example [
           *       {
           *         "address": "cc@example.com",
           *         "name": "John Doe"
           *       }
           *     ]
           */
          readonly cc?: unknown[][];
          /**
           * @example [
           *       {
           *         "address": "bcc@example.com",
           *         "name": "John Doe"
           *       }
           *     ]
           */
          readonly bcc?: unknown[][];
          readonly subject?: string;
          readonly intro?: string;
          seen?: boolean;
          readonly flagged?: boolean;
          readonly isDeleted?: boolean;
          readonly verifications?: string[];
          readonly retention?: boolean;
          /** Format: date-time */
          readonly retentionDate?: string;
          readonly text?: string;
          readonly html?: string[];
          readonly hasAttachments?: boolean;
          /**
           * @example [
           *       {
           *         "id": "ATTACH000001",
           *         "filename": "happy.png",
           *         "contentType": "image/png",
           *         "disposition": "attachment",
           *         "transferEncoding": "base64",
           *         "related": false,
           *         "size": 666,
           *         "downloadUrl": "/messages/id/attachment/ATTACH000001"
           *       }
           *     ]
           */
          readonly attachments?: unknown[][];
          readonly size?: number;
          readonly downloadUrl?: string;
          readonly sourceUrl?: string | null;
          /** Format: date-time */
          readonly createdAt?: string;
          /** Format: date-time */
          readonly updatedAt?: string;
        };
        relationships?: {
          accountId?: {
            data?: {
              type?: string;
              /** Format: iri-reference */
              id?: string;
            };
          };
        };
      };
      /** @description Related resources requested via the "include" query parameter. */
      readonly included?: components["schemas"]["Message.jsonapi"][];
    };
    "Message.jsonhal-message.read": {
      _links?: {
        self?: {
          /** Format: iri-reference */
          href?: string;
        };
      };
      readonly id?: string;
      msgid?: string;
      /**
       * @example {
       *       "address": "from@example.com",
       *       "name": "John Doe"
       *     }
       */
      from?: unknown;
      /**
       * @example [
       *       {
       *         "address": "receiver@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      to?: unknown[][];
      /**
       * @example [
       *       {
       *         "address": "cc@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      cc?: unknown[][];
      /**
       * @example [
       *       {
       *         "address": "bcc@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      bcc?: unknown[][];
      subject?: string;
      intro?: string;
      seen?: boolean;
      flagged?: boolean;
      isDeleted?: boolean;
      verifications?: string[];
      retention?: boolean;
      /** Format: date-time */
      retentionDate?: string;
      text?: string;
      html?: string[];
      hasAttachments?: boolean;
      /**
       * @example [
       *       {
       *         "id": "ATTACH000001",
       *         "filename": "happy.png",
       *         "contentType": "image/png",
       *         "disposition": "attachment",
       *         "transferEncoding": "base64",
       *         "related": false,
       *         "size": 666,
       *         "downloadUrl": "/messages/id/attachment/ATTACH000001"
       *       }
       *     ]
       */
      attachments?: unknown[][];
      size?: number;
      downloadUrl?: string;
      sourceUrl?: string | null;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
      /**
       * Format: iri-reference
       * @example https://example.com/
       */
      accountId?: string;
    };
    "Message.jsonhal-message.write": {
      _links?: {
        self?: {
          /** Format: iri-reference */
          href?: string;
        };
      };
      seen?: boolean;
    };
    "Message.jsonhal-messages.read": {
      _links?: {
        self?: {
          /** Format: iri-reference */
          href?: string;
        };
      };
      readonly id?: string;
      msgid?: string;
      /**
       * @example {
       *       "address": "from@example.com",
       *       "name": "John Doe"
       *     }
       */
      from?: unknown;
      /**
       * @example [
       *       {
       *         "address": "receiver@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      to?: unknown[][];
      subject?: string;
      intro?: string;
      seen?: boolean;
      isDeleted?: boolean;
      hasAttachments?: boolean;
      size?: number;
      downloadUrl?: string;
      sourceUrl?: string | null;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
      /**
       * Format: iri-reference
       * @example https://example.com/
       */
      accountId?: string;
    };
    "Message.jsonld-message.read": {
      readonly "@context"?:
        | string
        | ({
            "@vocab": string;
            /** @enum {string} */
            hydra: "http://www.w3.org/ns/hydra/core#";
          } & {
            [key: string]: unknown;
          });
      readonly "@id"?: string;
      readonly "@type"?: string;
      readonly id?: string;
      msgid?: string;
      /**
       * @example {
       *       "address": "from@example.com",
       *       "name": "John Doe"
       *     }
       */
      from?: unknown;
      /**
       * @example [
       *       {
       *         "address": "receiver@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      to?: unknown[][];
      /**
       * @example [
       *       {
       *         "address": "cc@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      cc?: unknown[][];
      /**
       * @example [
       *       {
       *         "address": "bcc@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      bcc?: unknown[][];
      subject?: string;
      intro?: string;
      seen?: boolean;
      flagged?: boolean;
      isDeleted?: boolean;
      verifications?: string[];
      retention?: boolean;
      /** Format: date-time */
      retentionDate?: string;
      text?: string;
      html?: string[];
      hasAttachments?: boolean;
      /**
       * @example [
       *       {
       *         "id": "ATTACH000001",
       *         "filename": "happy.png",
       *         "contentType": "image/png",
       *         "disposition": "attachment",
       *         "transferEncoding": "base64",
       *         "related": false,
       *         "size": 666,
       *         "downloadUrl": "/messages/id/attachment/ATTACH000001"
       *       }
       *     ]
       */
      attachments?: unknown[][];
      size?: number;
      downloadUrl?: string;
      sourceUrl?: string | null;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
      /**
       * Format: iri-reference
       * @example https://example.com/
       */
      accountId?: string;
    };
    "Message.jsonld-message.write": {
      readonly "@context"?:
        | string
        | ({
            "@vocab": string;
            /** @enum {string} */
            hydra: "http://www.w3.org/ns/hydra/core#";
          } & {
            [key: string]: unknown;
          });
      readonly "@id"?: string;
      readonly "@type"?: string;
      seen?: boolean;
    };
    "Message.jsonld-messages.read": {
      readonly "@context"?:
        | string
        | ({
            "@vocab": string;
            /** @enum {string} */
            hydra: "http://www.w3.org/ns/hydra/core#";
          } & {
            [key: string]: unknown;
          });
      readonly "@id"?: string;
      readonly "@type"?: string;
      readonly id?: string;
      msgid?: string;
      /**
       * @example {
       *       "address": "from@example.com",
       *       "name": "John Doe"
       *     }
       */
      from?: unknown;
      /**
       * @example [
       *       {
       *         "address": "receiver@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      to?: unknown[][];
      subject?: string;
      intro?: string;
      seen?: boolean;
      isDeleted?: boolean;
      hasAttachments?: boolean;
      size?: number;
      downloadUrl?: string;
      sourceUrl?: string | null;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
      /**
       * Format: iri-reference
       * @example https://example.com/
       */
      accountId?: string;
    };
    "Message.jsonopenapi-message.read": {
      readonly id?: string;
      msgid?: string;
      /**
       * @example {
       *       "address": "from@example.com",
       *       "name": "John Doe"
       *     }
       */
      from?: unknown;
      /**
       * @example [
       *       {
       *         "address": "receiver@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      to?: unknown[][];
      /**
       * @example [
       *       {
       *         "address": "cc@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      cc?: unknown[][];
      /**
       * @example [
       *       {
       *         "address": "bcc@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      bcc?: unknown[][];
      subject?: string;
      intro?: string;
      seen?: boolean;
      flagged?: boolean;
      isDeleted?: boolean;
      verifications?: string[];
      retention?: boolean;
      /** Format: date-time */
      retentionDate?: string;
      text?: string;
      html?: string[];
      hasAttachments?: boolean;
      /**
       * @example [
       *       {
       *         "id": "ATTACH000001",
       *         "filename": "happy.png",
       *         "contentType": "image/png",
       *         "disposition": "attachment",
       *         "transferEncoding": "base64",
       *         "related": false,
       *         "size": 666,
       *         "downloadUrl": "/messages/id/attachment/ATTACH000001"
       *       }
       *     ]
       */
      attachments?: unknown[][];
      size?: number;
      downloadUrl?: string;
      sourceUrl?: string | null;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
      /**
       * Format: iri-reference
       * @example https://example.com/
       */
      accountId?: string;
    };
    "Message.jsonopenapi-message.write": {
      seen?: boolean;
    };
    "Message.jsonopenapi-messages.read": {
      readonly id?: string;
      msgid?: string;
      /**
       * @example {
       *       "address": "from@example.com",
       *       "name": "John Doe"
       *     }
       */
      from?: unknown;
      /**
       * @example [
       *       {
       *         "address": "receiver@example.com",
       *         "name": "John Doe"
       *       }
       *     ]
       */
      to?: unknown[][];
      subject?: string;
      intro?: string;
      seen?: boolean;
      isDeleted?: boolean;
      hasAttachments?: boolean;
      size?: number;
      downloadUrl?: string;
      sourceUrl?: string | null;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
      /**
       * Format: iri-reference
       * @example https://example.com/
       */
      accountId?: string;
    };
    "Source-source.read": {
      readonly id?: string;
      downloadUrl?: string;
      data?: string;
    };
    "Source.jsonapi": {
      readonly id?: string;
      downloadUrl?: string;
      data?: string;
      mime_tree?: string[];
      isDeleted?: boolean;
      readonly mimeTree?: string[] | null;
    };
    "Source.jsonhal-source.read": {
      _links?: {
        self?: {
          /** Format: iri-reference */
          href?: string;
        };
      };
      readonly id?: string;
      downloadUrl?: string;
      data?: string;
    };
    "Source.jsonld-source.read": {
      readonly "@context"?:
        | string
        | ({
            "@vocab": string;
            /** @enum {string} */
            hydra: "http://www.w3.org/ns/hydra/core#";
          } & {
            [key: string]: unknown;
          });
      readonly "@id"?: string;
      readonly "@type"?: string;
      readonly id?: string;
      downloadUrl?: string;
      data?: string;
    };
    "Source.jsonopenapi-source.read": {
      readonly id?: string;
      downloadUrl?: string;
      data?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  api_accounts_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description The new Account resource */
    requestBody: {
      content: {
        "application/ld+json": components["schemas"]["Account.jsonld-account.write"];
        "application/vnd.openapi+json": components["schemas"]["Account.jsonopenapi-account.write"];
        "application/hal+json": components["schemas"]["Account.jsonhal-account.write"];
        "application/vnd.api+json": components["schemas"]["Account.jsonapi"];
        "application/json": components["schemas"]["Account-account.write"];
        "application/xml": components["schemas"]["Account-account.write"];
        "text/xml": components["schemas"]["Account-account.write"];
        "application/x-yaml": components["schemas"]["Account-account.write"];
        "text/csv": components["schemas"]["Account-account.write"];
      };
    };
    responses: {
      /** @description Account resource created */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Account-account.read"];
        };
      };
      /** @description Invalid input */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unprocessable entity */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  api_accounts_id_get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Account identifier */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Account resource */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Account-account.read"];
        };
      };
      /** @description Resource not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  api_accounts_id_delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Account identifier */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Account resource deleted */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Resource not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  api_domains_get_collection: {
    parameters: {
      query?: {
        /** @description The collection page number */
        page?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Domain collection */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Domain"][];
        };
      };
    };
  };
  api_domains_id_get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Domain identifier */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Domain resource */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Domain"];
        };
      };
      /** @description Resource not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  api_me_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Account resource */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Account-account.read"];
        };
      };
      /** @description Resource not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  api_messages_get_collection: {
    parameters: {
      query?: {
        /** @description The collection page number */
        page?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Message collection */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Message-messages.read"][];
        };
      };
    };
  };
  api_messages_id_get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Message identifier */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Message resource */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Message-message.read"];
        };
      };
      /** @description Resource not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  api_messages_id_delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Message identifier */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Message resource deleted */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Resource not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  api_messages_id_patch: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Message identifier */
        id: string;
      };
      cookie?: never;
    };
    /** @description The updated Message resource */
    requestBody: {
      content: {
        "application/merge-patch+json": components["schemas"]["Message-message.write"];
        "application/vnd.api+json": components["schemas"]["Message.jsonapi"];
      };
    };
    responses: {
      /** @description Message resource updated */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Message-message.write"];
        };
      };
      /** @description Invalid input */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Resource not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unprocessable entity */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  attachment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Message identifier */
        id: string;
        /** @description Message identifier */
        attachmentId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Message resource */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Message-messages.read"];
        };
      };
      /** @description Resource not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  download: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Message identifier */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Download the message */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Message not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  api_sources_id_get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Source identifier */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Source resource */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Source-source.read"];
        };
      };
      /** @description Resource not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  login_check_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description The login data */
    requestBody: {
      content: {
        "application/json": {
          address: string;
          password: string;
        };
      };
    };
    responses: {
      /** @description User token created */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            readonly token: string;
          };
        };
      };
    };
  };
}
