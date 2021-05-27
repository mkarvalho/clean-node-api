import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import { sign } from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    await sign({ id: value }, this.secret)
    return await new Promise(resolve => resolve(null))
  }
}
