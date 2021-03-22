import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'
import { Client } from 'pg'

export class PostgresUserRepository implements IUsersRepository {
  private _client: Client
  constructor() {
    this._client = new Client({
      user: 'kako',
      host: 'localhost',
      database: 'SolidBase',
      password: 'kako123456',
      port: 5432,
    })
    this._client.connect()
  }
  async findByEmail(email: string): Promise<User> {
    const query = 'Select * from users where email = $1'
    const values = [email]
    const res = await this._client.query(query, values)
    console.log(res.rows[0])
    return res.rows[0]
  }
  async save(user: User): Promise<User> {
    const query =
      'INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [user.id, user.name, user.email, user.password]
    const res = await this._client.query(query, values)
    console.log(res.rows[0])
    await this._client.end()
    return res.rows[0]
  }
}
