import { Specification } from "../infra/typeorm/entities/specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification | undefined>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
