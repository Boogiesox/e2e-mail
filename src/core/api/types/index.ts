import "./mailtm-api";
import type { operations } from "./mailtm-api";

export type RequestPayload<T extends keyof operations> = operations[T] extends {
  requestBody: { content: { "application/json": infer U } };
}
  ? U
  : never;

export type ResponseData<
  T extends keyof operations,
  Status extends keyof operations[T]["responses"],
> = operations[T]["responses"][Status] extends {
  content: { "application/json": infer U };
}
  ? U
  : never;
