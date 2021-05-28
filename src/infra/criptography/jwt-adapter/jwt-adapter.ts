import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import { sign } from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await sign({ id: value }, this.secret)
    return accessToken
  }
}
