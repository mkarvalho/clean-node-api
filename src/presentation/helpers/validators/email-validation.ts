
import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols/email-validator'
import { Validation } from '../../protocols/validation'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error {
    const emailIsValid = this.emailValidator.isValid(input[this.fieldName])
    if (!emailIsValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
