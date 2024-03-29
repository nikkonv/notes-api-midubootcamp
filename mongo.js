mongoose = require('mongoose')
dotenv = require('dotenv')

dotenv.config()

const dbname =
  process.env.NODE_ENV === 'production'
    ? process.env.DBNAME
    : process.env.DBNAME_TEST
const password = process.env.PASSWORD

const connStr = `mongodb+srv://nikkonv:${password}@restful-example.ufdhs.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose
  .connect(connStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB Connected')
  })
  .catch((error) => {
    console.log(error)
  })
