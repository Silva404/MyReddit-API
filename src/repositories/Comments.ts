import { EntityRepository, Repository } from 'typeorm';
import Comments from '../models/Comments';

@EntityRepository(Comments)
export default class CommentsRepository extends Repository<Comments> {}
