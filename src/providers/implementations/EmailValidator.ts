import validator from 'validator'
import { IEmailValidator } from '../IEmailValidator'

export class EmailValidatorAdapter implements IEmailValidator {
  isValid(email: string): void {
    if (!validator.isEmail(email)) throw new Error('Email inválido')
  }
}
