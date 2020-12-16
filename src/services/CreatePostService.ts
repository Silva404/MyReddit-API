import { getCustomRepository } from 'typeorm';

import Post from 'models/Post';
import PostRepository from '../repositories/PostRepository';

interface IRequest {
  subreddit_id: string;
  user_id: string;
  title: string;
  content: string;
  votes: number;
}

export default class CreatePostService {
  public async execute({
    subreddit_id,
    user_id,
    title,
    content,
    votes,
  }: IRequest): Promise<Post> {
    const postRepository = getCustomRepository(PostRepository);

    const post = postRepository.create({
      title,
      content,
      subreddit_id,
      user_id,
      votes,
    });

    await postRepository.save(post);

    return post;
  }
}
