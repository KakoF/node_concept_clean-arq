const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, `../.env.${process.argv[2]}`),
})

import { app } from './app'
//dotenv.config({ path: path.join(__dirname, `../.env.${process.argv[2]}`) })
//dotenv.config()

app.listen(process.env.PORT)
