import { ICredentials } from "../proxyclick/credentials";
import { EmailSender } from "./email-sender";

export class Sender {
  static async sendMessage(credentials: ICredentials, recipient: string) {
    // TODO: write the content of this function that will send the credentials to a recipient.
    // It should use the EmailSender class as a dummy email sender
    // If the email sender throw an exception, it should retry exactly 4 times with 5 second interval, then stop retrying

    await EmailSender.sendEmail("...", "...");
  }
}
