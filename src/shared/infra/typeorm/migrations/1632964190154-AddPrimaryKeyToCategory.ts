import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPrimaryKeyToCategory1632963773499
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createPrimaryKey("categories", ["id"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropPrimaryKey("categories");
    }
}
