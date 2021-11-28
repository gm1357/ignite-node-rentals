import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordUseCase } from "./SendForgotPasswordUseCase";

let sendForgotPasswordUseCase: SendForgotPasswordUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordUseCase = new SendForgotPasswordUseCase(
            userRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dayjsDateProvider,
            mailProvider
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendEmail");
        const email = "pedih@feewutug.ca";

        await userRepositoryInMemory.create({
            driver_license: "283968",
            email,
            name: "Clara Bradley",
            password: "1234",
        });

        await sendForgotPasswordUseCase.execute(email);

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordUseCase.execute("mihrog@life.aq")
        ).rejects.toEqual(new AppError("User does not exist!"));
    });

    it("should be able to create an user token", async () => {
        const generateTokenMail = jest.spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );
        const email = "jut@jepah.vi";

        await userRepositoryInMemory.create({
            driver_license: "075728",
            email,
            name: "Clarence Roberts",
            password: "1234",
        });

        await sendForgotPasswordUseCase.execute(email);

        expect(generateTokenMail).toHaveBeenCalled();
    });
});
