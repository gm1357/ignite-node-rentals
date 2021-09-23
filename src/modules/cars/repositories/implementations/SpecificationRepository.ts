import { Specification } from "../../entities/specification";
import {
    ICreateSpecificationDTO,
    ISpecificationRepository,
} from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
    private specifications: Specification[];

    private static INSTANCE: SpecificationRepository;

    private constructor() {
        this.specifications = [];
    }

    static getInstance(): SpecificationRepository {
        if (!this.INSTANCE) {
            this.INSTANCE = new SpecificationRepository();
        }

        return this.INSTANCE;
    }

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification);
    }

    findByName(name: string): Specification | undefined {
        const specification = this.specifications.find(
            (specification) => specification.name === name
        );

        return specification;
    }
}

export { SpecificationRepository };
