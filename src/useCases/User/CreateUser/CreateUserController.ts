import { CreateUserUseCase } from './CreateUserUseCase'
import { Request, Response } from 'express'

export class CreateUserController {
  private _createUseCase: CreateUserUseCase
  constructor(createUseCase: CreateUserUseCase) {
    this._createUseCase = createUseCase
  }
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    try {
      const user = await this._createUseCase.execute({
        name,
        email,
        password,
      })
      return response.status(201).send(user)
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.',
      })
    }
  }
}
