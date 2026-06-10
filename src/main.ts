import { getAccountMessages, searchAccountMessages } from "./core/mailtm";

async function main() {
  const messages = await getAccountMessages({
    address: "test-ing@web-library.net",
    password: "Pass1234",
  });

  //console.log(messages?.map(({ to }) => to));

  console.log(
    searchAccountMessages(messages, {
      subject: "Testing",
      recipient: "test-ing+123456@web-library.net",
      sender: "09egrego@gmail.com",
      createdAfter: "2026-06-09T03:49:21+00:00",
    }),
  );
}

main();
