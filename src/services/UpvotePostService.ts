import { getCustomRepository } from 'typeorm';
import Post from '../models/Post';
import PostRepository from '../repositories/PostRepository';
import UserRepository from '../repositories/UserRepository';

interface IRequest {
  id: string;
  votes: number;
}

export default class UpvotePostService {
  public async execute({ id, votes }: IRequest): Promise<Post> {
    const userRepository = getCustomRepository(UserRepository);
    const postRepository = getCustomRepository(PostRepository);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User is not registered.');
    }

    const post = postRepository.create({
      user_id: id,
      votes,
    });

    await postRepository.save(post);

    return post;
  }
}
