import { Decrypter } from '../../protocols/criptography/decrypter'
import { DbLoadAccoubtByToken } from './db-load-account-by-token'

describe('DbLoadAccoubtByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (value: string): Promise<string> {
        return await Promise.resolve('any_value')
      }
    }
    const decrypterStub = new DecrypterStub()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    const sut = new DbLoadAccoubtByToken(decrypterStub)
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
