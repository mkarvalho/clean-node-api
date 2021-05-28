export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || '3e6bda09d74182e9d5dab8276aede7afa1cdff821b763ce912f5269d72331e8f'
}
