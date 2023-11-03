const { createHmac, randomBytes } = require('node:crypto');
const { prismaClient } = require('../libs/db');
const JWT = require('jsonwebtoken');

class UserService {
  static generateHash(salt, password) {
    return createHmac('sha256', salt).update(password).digest('hex');
  }

  static createUser(payload) {
    const { firstName, lastName, email, password } = payload;
    const salt = randomBytes(32).toString('hex');
    const hashedPassword = this.generateHash(salt, password);

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt,
      },
    });
  }

  static getUserByEmail(email) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  static async getUserToken(payload) {
    const { email, password } = payload;
    const user = await this.getUserByEmail(email);
    if (!user) throw new Error('User not found!');

    const userSalt = user.salt;
    const userHashedPassword = this.generateHash(userSalt, password);

    if (userHashedPassword !== user.password)
      throw new Error('Incorrect Password!');

    // Generate token
    const token = JWT.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );

    return token;
  }
}

module.exports = UserService;
