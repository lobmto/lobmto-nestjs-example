import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1736573035927 implements MigrationInterface {
    name = 'Migrate1736573035927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "word_tag_id" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tagId" uuid NOT NULL, "wordId" uuid NOT NULL, CONSTRAINT "PK_8dbeb74fee0ed71c5dd6fb7a9d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_6b66a5fd622e6a8e43a3ba387f" ON "word_tag_id" ("tagId", "wordId") `);
        await queryRunner.query(`ALTER TABLE "word_tag_id" ADD CONSTRAINT "FK_1cf7a9d8ca8e4152a52fb92ee40" FOREIGN KEY ("wordId") REFERENCES "word"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "word_tag_id" DROP CONSTRAINT "FK_1cf7a9d8ca8e4152a52fb92ee40"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6b66a5fd622e6a8e43a3ba387f"`);
        await queryRunner.query(`DROP TABLE "word_tag_id"`);
    }

}
