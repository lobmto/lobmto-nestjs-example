import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1734225929557 implements MigrationInterface {
    name = 'Migrate1734225929557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "status" ("id", "status") VALUES (1, 'UP')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "status" WHERE "id" = 1`);
    }

}
