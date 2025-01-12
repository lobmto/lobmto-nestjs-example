import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1736680145504 implements MigrationInterface {
    name = 'Migrate1736680145504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meaning" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "meaning" character varying NOT NULL, "wordId" uuid, CONSTRAINT "PK_333c33c0b378df42043fb0541dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "word" DROP COLUMN "meaning"`);
        await queryRunner.query(`ALTER TABLE "meaning" ADD CONSTRAINT "FK_d3aec81d9cc47cd34818da1d9b8" FOREIGN KEY ("wordId") REFERENCES "word"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meaning" DROP CONSTRAINT "FK_d3aec81d9cc47cd34818da1d9b8"`);
        await queryRunner.query(`ALTER TABLE "word" ADD "meaning" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "meaning"`);
    }

}
