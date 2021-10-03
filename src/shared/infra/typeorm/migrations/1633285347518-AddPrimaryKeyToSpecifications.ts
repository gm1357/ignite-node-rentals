import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPrimaryKeyToSpecifications1633285347518
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createPrimaryKey("specifications", ["id"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropPrimaryKey("specifications");
    }
}
