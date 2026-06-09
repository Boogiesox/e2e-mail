/**
 * Generates TypeScript types from the OpenAPI schema of the specified API, filtering for a specific content type where multiple are available.
 * @usage Run the script with the following command:
 *   node scripts/generate-types.js <accept> <url> <destination>
 * @param {string} accept - The content type to filter for (e.g., "application/json").
 * @param {string} url - The URL of the OpenAPI schema to fetch.
 * @param {string} destination - The file path where the generated types should be saved.
 */

import openapiTS, { astToString } from "openapi-typescript";
import fs from "node:fs";
import type { SchemaResponse } from ".";

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
