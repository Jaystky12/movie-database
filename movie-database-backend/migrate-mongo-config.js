// In this file you can configure migrate-mongo

const config = {
  mongodb: {
    url: process.env.MONGO_ENDPOINT,
    databaseName: process.env.MONGO_DATABASE,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: '' + process.env.MONGO_USERNAME,
      password: '' + process.env.MONGO_PASSWORD,
    },
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js'
}

// Return the config as a promise
module.exports = config
