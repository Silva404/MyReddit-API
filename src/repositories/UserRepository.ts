import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }
}
