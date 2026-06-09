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

    console.log(`Messages for ${testAccount.address}`, messages);
  }
}

main();
