import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepository } from "../../repositories/implementations/UserRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: UserRepository
    ) {}

    async execute(createUserDTO: ICreateUserDTO): Promise<void> {
        const hashedPassword = await hash(createUserDTO.password, 8);
        const userExists = await this.userRepository.findByEmail(
            createUserDTO.email
        );

        if (userExists) {
            throw new Error("User already exists!");
        }

        await this.userRepository.create({
            ...createUserDTO,
            password: hashedPassword,
        });
    }
}

export { CreateUserUseCase };
