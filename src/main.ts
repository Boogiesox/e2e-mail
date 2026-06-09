import {
  createAccount,
  getDomains,
  getMessages,
  getSource,
  createToken,
} from "./core/api/mailtm-api";

async function main() {
  const domain = await getDomains();
  const activeDomain = domain.find((d) => d.isActive)?.domain;

  const testAccount = {
    address: `test-ing@${activeDomain}`,
    password: "Pass1234",
  };

  await createAccount(testAccount);

  const auth = await createToken(testAccount);

  if (auth?.token) {
    const messages = await getMessages(auth.token);

    const [latestMessage] = messages ?? [];

    const messageSource = await getSource(
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
