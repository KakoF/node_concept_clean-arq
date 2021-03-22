import { v4 as uuidv4 } from 'uuid'

export class User {
  public readonly id: string

  public name: string
  public email: string
  public password: string

  /*constructor(props: Omit<User, 'id'>, id?: string) {
    //this.name = props.name
    Object.assign(this, props)
    if (!id) {
      this.id = uuidv4()
    }
  }*/

  constructor(name: string, email: string, password: string, id?: string) {
    this.name = name
    this.email = email
    this.password = password
    if (!id) {
      this.id = uuidv4()
    } else {
      this.id = id
    }
  }

  isValid(): void {
    if (!this.name) throw new Error('Nome deve ser preenchido')
    if (!this.email) throw new Error('Email deve ser preenchido')
    if (!this.password) throw new Error('Password deve ser preenchido')
  }
}
