import { EntityRepository, Repository } from 'typeorm';
import Subreddit from '../models/Subreddit';

@EntityRepository(Subreddit)
export default class SubredditRepository extends Repository<Subreddit> {}
