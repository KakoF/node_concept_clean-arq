import { User } from '../../entities/User'

export interface dataContext {
  user: string
  host: string
  database: string
  password: string
  port: number
}

export interface IDbContext {
  //connect(connection: dataContext): Promise<void>
  close(): Promise<void>
  select(query: any, values: any): Promise<User>
  insert(query: any, values: any): Promise<User>
  commit(): Promise<void>
  rollback(): Promise<void>
}
