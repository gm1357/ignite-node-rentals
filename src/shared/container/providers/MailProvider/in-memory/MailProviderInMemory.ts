import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
    private messages: any[] = [];

    async sendEmail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        this.messages.push({
            to,
            subject,
            variables,
            path,
        });
    }
}

export { MailProviderInMemory };
