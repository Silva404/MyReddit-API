import { getCustomRepository } from 'typeorm';

import Comments from 'models/Comments';
import CommentsRepository from '../repositories/Comments';

interface IRequest {
  post_id: string;
  user_id: string;
  title: string;
  content: string;
  votes: number;
}

export default class CreatePostCommentService {
  public async execute({
    post_id,
    user_id,
    title,
    content,
    votes,
  }: IRequest): Promise<Comments> {
    const commentsRepository = getCustomRepository(CommentsRepository);

    const comments = commentsRepository.create({
      post_id,
      user_id,
      title,
      content,
      votes,
    });

    await commentsRepository.save(comments);

    return comments;
  }
}
