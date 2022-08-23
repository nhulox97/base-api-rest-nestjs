require('dotenv').config();

module.exports = {
  name: 'default',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  schema: 'public',
  entities: process.argv[2] == 'seed' ? [process.env.ORM_ENTITIES_SRC] : [process.env.ORM_ENTITIES],
  migrations: [process.env.ORM_MIGRATIONS],
  migrationsTableName: [process.env.ORM_MIGRATIONS_TABLE_NAME],
  synchronize: false,
  ssl: process.env.STAGE !== 'dev' ? true : false,
  extra: { ssl: process.env.STAGE !== 'dev' ? { rejectUnauthorized: false } : undefined },
  logging:
    process.env.STAGE === 'dev'
      ? true
      : process.env.STAGE === 'staging'
      ? ['error', 'warn', 'info']
      : ['error', 'warn'],
  migrationsRun: true,
  cli: {
    migrationsDir: process.env.ORM_MIGRATIONS_DIR,
  },
};
