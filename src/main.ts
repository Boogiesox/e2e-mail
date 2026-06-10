import { getAccountMessages } from "./core/mailtm";

async function main() {
  const messages = await getAccountMessages({
    address: "test-ing@web-library.net",
    password: "Pass1234",
  });

  console.log(messages);
}

main();
