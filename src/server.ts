import dotenv from 'dotenv'
const path = require('path')
/*{
  path: process.env.NODE_ENV === 'dev' ? '.env.development' : '.env',
})*/
import { app } from './app'
dotenv.config({ path: path.join(__dirname, `../.env.${process.argv[2]}`) })
app.listen(process.env.PORT)
