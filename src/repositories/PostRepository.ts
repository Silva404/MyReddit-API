import { EntityRepository, Repository } from 'typeorm';
import Post from '../models/Post';

@EntityRepository(Post)
export default class PostRepository extends Repository<Post> {
  public async findByEmail(user_id: string): Promise<Post | null> {
    const post = await this.findOne({
      where: { user_id },
    });

    return post;
  }
}
