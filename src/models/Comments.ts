import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Post from './Post';
import User from './User';

@Entity('comments')
class Comments {
  @PrimaryGeneratedColumn('uuid')
  comments_id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  post_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column()
  votes: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comments;
