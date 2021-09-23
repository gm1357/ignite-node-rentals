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
        await this.userRepository.create(createUserDTO);
    }
}

export { CreateUserUseCase };
