import { parse } from 'dotenv/types'
import { Client } from 'pg'
import { dataContext, IDbContext } from '../IDbContext'

export class Context implements IDbContext {
  private _client: Client
  constructor() {
    console.log(process.env.PORT)
    this._client = new Client({
      user: process.env.DBUSER,
      host: process.env.DBHOST,
      database: process.env.DBDATABASE,
      password: process.env.DBPASSWORD,
      port: Number(process.env.DBPORT),
    })
    this._client.connect()
  }

  async begin(): Promise<void> {
    await this._client.query('BEGIN')
  }
  async close(): Promise<void> {
    await this._client.end()
  }
  async select(query: any, values: any): Promise<any> {
    const res = await this._client.query(query, values)
    return res.rows[0]
  }
  async insert(query: any, values: any): Promise<any> {
    const res = await this._client.query(query, values)
    return res.rows[0]
  }
  async commit(): Promise<void> {
    await this._client.query('COMMIT')
  }
  async rollback(): Promise<void> {
    await this._client.query('ROLLBACK')
  }
}
