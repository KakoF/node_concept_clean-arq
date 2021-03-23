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
      port: parseInt(process.env.DBPORT),
    })
    this._client.connect()
  }

  close(): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async select(query: any, values: any): Promise<any> {
    const res = await this._client.query(query, values)
    return res.rows[0]
  }
  async insert(query: any, values: any): Promise<any> {
    const res = await this._client.query(query, values)
    await this._client.end()
    return res.rows[0]
  }
  commit(): Promise<void> {
    throw new Error('Method not implemented.')
  }
  rollback(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
