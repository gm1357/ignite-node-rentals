import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUserRepository {
    create(createUserDTO: ICreateUserDTO): Promise<void>;
}

export { IUserRepository };
