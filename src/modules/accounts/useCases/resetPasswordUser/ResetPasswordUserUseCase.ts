import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayJsDateProvider: IDateProvider,
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(
            token
        );

        if (!userToken || !userToken.id) {
            throw new AppError("Invalid token!");
        }

        if (
            this.dayJsDateProvider.compareIfBefore(
                userToken.expires_date,
                this.dayJsDateProvider.dateNow()
            )
        ) {
            throw new AppError("Expired token!");
        }

        const user = await this.userRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError("User does not exist!");
        }

        user.password = await hash(password, 8);

        await this.userRepository.create(user);

        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase };
