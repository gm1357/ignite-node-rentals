import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(createUserDTO: ICreateUserDTO): Promise<void> {
        const hashedPassword = await hash(createUserDTO.password, 8);
        const userExists = await this.userRepository.findByEmail(
            createUserDTO.email
        );

        if (userExists) {
            throw new AppError("User already exists!");
        }

        await this.userRepository.create({
            ...createUserDTO,
            password: hashedPassword,
        });
    }
}

export { CreateUserUseCase };
