import { getCustomRepository } from 'typeorm';

import Subreddit from 'models/Subreddit';
import SubredditRepository from '../repositories/SubredditRepository';

interface IRequest {
  user_id: string;
  title: string;
  description: string;
}

class CreateSubredditService {
  public async execute({
    user_id,
    title,
    description,
  }: IRequest): Promise<Subreddit> {
    const subredditRepository = await getCustomRepository(SubredditRepository);

    const subreddit = subredditRepository.create({
      user_id,
      title,
      description,
    });

    await subredditRepository.save(subreddit);

    return subreddit;
  }
}

export default CreateSubredditService;
