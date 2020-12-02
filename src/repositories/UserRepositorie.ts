import User from 'models/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }
}
