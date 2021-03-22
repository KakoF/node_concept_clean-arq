import { MailtrapMailProvider } from '../../../providers/implementations/MailtrapMailProvider'
import { Context } from '../../../repositories/context/implementations/Context'
import { PostgresUserRepository } from '../../../repositories/implementations/PostgresUserRepository'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

const mailtrapMailProvider = new MailtrapMailProvider()
const context = new Context()
const postgresUserRepository = new PostgresUserRepository(context)

const createUserUseCase = new CreateUserUseCase(
  postgresUserRepository,
  mailtrapMailProvider
)

const creatUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, creatUserController }
