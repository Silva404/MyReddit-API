import User from 'models/User';
import { hash } from 'bcryptjs';
import UserRepository from 'repositories/UserRepositorie';
import { getCustomRepository } from 'typeorm';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const checkUserExists = userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new Error('This email is already registered.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
