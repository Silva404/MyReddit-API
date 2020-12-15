import { getCustomRepository } from 'typeorm';
import Post from '../models/Post';
import PostRepository from '../repositories/PostRepository';

export default class ListUserPosts {
  public async execute({ id }: { id: string }): Promise<Post[] | null> {
    const postRepository = getCustomRepository(PostRepository);

    const posts = await postRepository.find({ where: { user_id: id } });

    return posts;
  }
}
