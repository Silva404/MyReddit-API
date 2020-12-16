import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import UserProfileService from '../services/UserProfileService';
import AuthenticateUserService from '../services/AuthenticateUserService';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/register', async (request, response) => {
  const { name, email, password } = request.body;

  const userService = new CreateUserService();
  const user = await userService.execute({ name, email, password });
  delete user.password;

  return response.json(user);
});

usersRouter.post('/login', async (request, response) => {
  const { email, password } = request.body;

  const authService = new AuthenticateUserService();

  const { user, token } = await authService.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

usersRouter.get('/profile', ensureAuthenticated, async (request, response) => {
  const userProfile = new UserProfileService();

  const user = await userProfile.execute({ user_id: request.user.id });

  return response.json({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  });
});

export default usersRouter;
