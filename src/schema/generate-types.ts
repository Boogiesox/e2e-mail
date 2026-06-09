/**
 * Generates TypeScript types from the OpenAPI schema of the Mail.tm API, filtering for a specific content type.
 */

import openapiTS, { astToString } from "openapi-typescript";
import fs from "node:fs";

type SchemaResponse = {
  description?: string;
  content?: Record<string, unknown>;
  links?: Record<string, unknown>;
};

const [accept = "", url = "", destination = ""] = process.argv.slice(2);

const schema = await fetch(url).then((r) => r.json());

for (const path of Object.values(schema.paths)) {
  for (const method of Object.values(path ?? {})) {
    if (!method?.responses) continue;

    for (const response of Object.values(
      method.responses as SchemaResponse[],
    )) {
      if (!response?.content) continue;

      const content = response.content;

      if (content[accept]) {
        response.content = {
          [accept]: content[accept],
        };
      }
    }
  }
}

const ast = await openapiTS(schema);

fs.writeFileSync(destination, astToString(ast));
console.log(
  `✅ Generated filtered ${accept} types from ${url} at ${destination}`,
);
