import Post from 'models/Post';
import { getCustomRepository } from 'typeorm';
import PostRepository from '../repositories/PostRepository';
import UserRepository from '../repositories/UserRepository';

interface IRequest {
  id: string;
  title: string;
  content: string;
  votes: number;
}

export default class CreatePostService {
  public async execute({ id, title, content, votes }: IRequest): Promise<Post> {
    const userRepository = getCustomRepository(UserRepository);
    const postRepository = getCustomRepository(PostRepository);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User is not registered.');
    }

    const post = postRepository.create({
      title,
      content,
      user_id: id,
      votes,
    });

    await postRepository.save(post);

    return post;
  }
}
