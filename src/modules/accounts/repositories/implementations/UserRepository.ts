import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/user";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create(createUserDTO: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            ...createUserDTO,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.repository.findOne({ email });
    }
}

export { UserRepository };
