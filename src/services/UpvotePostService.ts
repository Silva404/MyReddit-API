import { getCustomRepository } from 'typeorm';
import Post from '../models/Post';
import PostRepository from '../repositories/PostRepository';

interface IRequest {
  votes: number;
  id: string;
  user_id: string;
}

export default class UpvotePostService {
  public async execute({ votes, user_id, id }: IRequest): Promise<Post> {
    const postRepository = getCustomRepository(PostRepository);
    const post = await postRepository.findOne({ where: { user_id, id } });
    post.votes = votes;

    await postRepository.save(post);

    return post;
  }
}
