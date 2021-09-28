import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/user";

import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
    private users: User[] = [];

    async create(createUserDTO: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            ...createUserDTO,
        });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find((user) => user.email === email);
    }

    async findById(id: string): Promise<User | undefined> {
        return this.users.find((user) => user.id === id);
    }
}

export { UserRepositoryInMemory };
