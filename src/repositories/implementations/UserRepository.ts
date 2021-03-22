import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'
import { Client } from 'pg'
import { IDbContext } from '../context/IDbContext'

export class UserRepository implements IUsersRepository {
  private _contex: IDbContext
  constructor(contex: IDbContext) {
    this._contex = contex
  }
  async findByEmail(email: string): Promise<User> {
    const query = 'Select * from users where email = $1'
    const values = [email]
    const res = await this._contex.select(query, values)
    return res
  }
  async save(user: User): Promise<User> {
    const query =
      'INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [user.id, user.name, user.email, user.password]
    const res = await this._contex.insert(query, values)
    return res
  }
}
