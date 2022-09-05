const { DataSource, TypeORMError } = require('typeorm');

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

appDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err)
  appDataSource.destroy()
  });

  app.post("/users", async (req, res, next) => {
    const { name, email, profile_image, password } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password
    ) VALUES (?, ?, ?, ?);
    `,
    [ name, email, profile_image, password ]
  );

      res.status(201).json({ "message" : "userCreated"});
  })

module.exports = {
  createUser
}