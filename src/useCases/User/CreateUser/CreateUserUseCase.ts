import { User } from '../../../entities/User'
import { IMailProvider } from '../../../providers/IMailProvider'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './ICreateUserDTO'

export class CreateUserUseCase {
  private _usersRepository: IUsersRepository
  private _emailProvider: IMailProvider
  constructor(usersRepository: IUsersRepository, emailProvider: IMailProvider) {
    this._usersRepository = usersRepository
    this._emailProvider = emailProvider
  }
  //OU
  //constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    const exist = await this._usersRepository.findByEmail(data.email)
    if (exist) {
      throw new Error('Usuário já existe')
    }
    const userData = new User(data)
    userData.isValid()
    const user = await this._usersRepository.save(userData)
    await this._emailProvider.sendEmail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'Clean Node',
        email: 'kako@gmail.com',
      },
      subject: 'Seja bem vindo',
      body: '<o>Olá, cadastro realizado! Faça o Login...</p>',
    })
    return user
  }
}
