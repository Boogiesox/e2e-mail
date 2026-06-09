import { MailTm } from "./mailtm";

const client = new MailTm();

async function main() {
  const domain = await client.getActiveDomain();

  const testAccount = {
    address: `test-ing@${domain}`,
    password: "Pass1234",
  };

  await client.createAccount(testAccount);

  const auth = await client.getToken(testAccount);

  if (auth?.token) {
    const messages = await client.getMessages(auth.token);

    const [latestMessage] = messages ?? [];

    const messageSource = await client.getSource(
      auth.token,
      latestMessage?.sourceUrl?.split("/").pop() ?? "",
    );

    console.log(
      `Lastest message source for ${testAccount.address}`,
      latestMessage,
    );
  }
}

main();
