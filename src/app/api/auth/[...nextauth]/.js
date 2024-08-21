adapter: TypeORMLegacyAdapter({
    type: 'postgres',
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DB,
    synchronize: false
  })