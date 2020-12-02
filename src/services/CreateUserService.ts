import User from 'models/User';
import UserRepository from 'repositories/UserRepositorie';
import { getCustomRepository } from 'typeorm';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const checkUserExists = userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new Error('This email is already registered.');
    }

    const user = await userRepository.create({ name, email, password });

    return user;
  }
}
