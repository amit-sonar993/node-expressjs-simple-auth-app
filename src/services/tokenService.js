const crypto = require('crypto')
const {AuthAccessToken} = require('../app/database/models')

const generateToken = async (user) => {
  let accessToken = crypto.randomBytes(32).toString('hex')
  var currentDate = new Date(),
    accessTokenLifeTime = new Date(currentDate);
  refreshTokenLifeTime = new Date(currentDate);


  accessTokenLifeTime.setMinutes(accessTokenLifeTime.getMinutes() + process.env.ACCESS_TOKEN_LIFETIME || 600);


  const accessTokenCreated = await AuthAccessToken.create({
    id: accessToken,
    client_id: 1,
    user_id: user.id,
    expires_at: accessTokenLifeTime
  })

  return {
    "user": user,
    "access_token": accessTokenCreated.id,
    "expires_at": accessTokenCreated.expires_at,
    "token_type": "Bearer"
  }
}

module.exports = {
  generateToken
}