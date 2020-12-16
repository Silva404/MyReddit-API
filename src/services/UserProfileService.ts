import { getCustomRepository } from 'typeorm';

import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

interface IRequest {
  user_id: string;
}

class UserProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new Error('Only authenticated users can see the profile');
    }

    return user;
  }
}

export default UserProfileService;
