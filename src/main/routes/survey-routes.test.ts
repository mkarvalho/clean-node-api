import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection
describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://imgae-name.com'
            },
            {
              answer: 'Answer 2'
            }
          ]
        })
        .expect(403)
    })

    test('Should return 204 with valid token', async () => {
      const res = await accountCollection.insertOne({
        name: 'Matheus',
        email: 'matheus@email.com',
        password: '123',
        role: 'admin'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ _id: id }, env.jwtSecret)

      await accountCollection.updateOne({ _id: id }, {
        $set: {
          accessToken
        }
      })

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://imgae-name.com'
            },
            {
              answer: 'Answer 2'
            }
          ]
        })
        .expect(204)
    })
  })
})