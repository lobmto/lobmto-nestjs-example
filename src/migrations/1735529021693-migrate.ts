import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1735529021693 implements MigrationInterface {
    name = 'Migrate1735529021693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "word_tag" ("word_id" uuid NOT NULL, "tag_id" uuid NOT NULL, CONSTRAINT "PK_41703f8fe22c7e87ff6daf6c46b" PRIMARY KEY ("word_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_24aa1be087aa1416242141c505" ON "word_tag" ("word_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ff1adfdfa6c0b2a3785e875026" ON "word_tag" ("tag_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_ff1adfdfa6c0b2a3785e875026"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24aa1be087aa1416242141c505"`);
        await queryRunner.query(`DROP TABLE "word_tag"`);
    }

}
