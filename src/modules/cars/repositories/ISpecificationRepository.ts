import { Specification } from "../entities/specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    create({ name, description }: ICreateSpecificationDTO): void;
    findByName(name: string): Specification | undefined;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
