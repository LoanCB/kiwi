import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueKeywordTitle1722190504791 implements MigrationInterface {
  name = 'UniqueKeywordTitle1722190504791';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`keyword\`
            ADD UNIQUE INDEX \`IDX_a1af8669df11217cf8d9789d41\` (\`title\`)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`keyword\` DROP INDEX \`IDX_a1af8669df11217cf8d9789d41\`
        `);
  }
}
