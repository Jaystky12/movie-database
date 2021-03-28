module.exports = {
  async up (db, client) {
    for (const collectionName in indexesToCreate) {
      if (indexesToCreate.hasOwnProperty(collectionName)) {
        /** @var {Collection} */
        const collection = db.collection(collectionName)
        for (const indexConfig of indexesToCreate[collectionName]) {
          await collection.createIndex(...indexConfig)
        }
      }
    }
  },

  async down (db, client) {
  },
}

const indexesToCreate = {
  user: [
    [{ name: 'text' }, { name: 'user_name' }],
    [{ email: 1 }, { name: 'user_email' }],
    [{ password: 1 }, { name: 'user_password' }],
    [{ favouriteMovies: 1 }, { name: 'user_favouriteMovies' }],
  ],
}
