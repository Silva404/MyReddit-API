import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
export default class UserTokenRepository extends Repository<User> {
  public async findByToken(token: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { token },
    });

    return user;
  }
  // public async generate(user_id: string): Promise<User | undefined> {
  //   const userToken =
  // }
}
