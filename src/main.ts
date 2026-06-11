import { getAccountMessages } from "./core/mailtm";

async function main() {
  const messages = await getAccountMessages(
    "test-ing@web-library.net",
    "Pass1234",
    {
      subject: "SpaceX",
      recipient: "test-ing+123456@web-library.net",
      sender: "09egrego@gmail.com",
      createdAfter: "2026-06-09T03:49:21+00:00",
    },
  );

  console.log(messages);
}

main();
