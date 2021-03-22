import { User } from '../../../entities/User'
import { IEmailValidator } from '../../../providers/IEmailValidator'
import { IMailProvider } from '../../../providers/IMailProvider'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './ICreateUserDTO'

export class CreateUserUseCase {
  private _usersRepository: IUsersRepository
  private _emailProvider: IMailProvider
  private _emailValidator: IEmailValidator
  constructor(
    usersRepository: IUsersRepository,
    emailProvider: IMailProvider,
    emailValidator: IEmailValidator
  ) {
    this._usersRepository = usersRepository
    this._emailProvider = emailProvider
    this._emailValidator = emailValidator
  }
  //OU
  //constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    this._emailValidator.isValid(data.email)
    const exist = await this._usersRepository.findByEmail(data.email)
    if (exist) {
      throw new Error('Usuário já existe')
    }
    const userData = new User(data.name, data.email, data.password)
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
