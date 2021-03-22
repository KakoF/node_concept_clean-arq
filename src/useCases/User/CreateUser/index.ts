import { EmailValidatorAdapter } from '../../../providers/implementations/EmailValidator'
import { MailtrapMailProvider } from '../../../providers/implementations/MailtrapMailProvider'
import { Context } from '../../../repositories/context/implementations/Context'
import { UserRepository } from '../../../repositories/implementations/UserRepository'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

const mailtrapMailProvider = new MailtrapMailProvider()
const emailValidator = new EmailValidatorAdapter()
const context = new Context()
const userRepository = new UserRepository(context)

const createUserUseCase = new CreateUserUseCase(
  userRepository,
  mailtrapMailProvider,
  emailValidator
)

const creatUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, creatUserController }
