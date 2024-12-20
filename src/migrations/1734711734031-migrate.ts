import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1734711734031 implements MigrationInterface {
    name = 'Migrate1734711734031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "word" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "word" character varying NOT NULL, "meaning" character varying NOT NULL, CONSTRAINT "PK_ad026d65e30f80b7056ca31f666" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "word"`);
    }

}
