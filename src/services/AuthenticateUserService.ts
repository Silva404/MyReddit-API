import User from 'models/User';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';
import AuthConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid email/password combination.');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
