import { Router } from 'express';
import passport from 'passport';
import * as userController from '../controllers/user';
import passportConfig from '../passport';

const router = Router();

router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  userController.allUsers,
);

router.get(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  userController.userProfile,
);

router.post('/user', userController.createUser);

router.post('/user/logIn', userController.logIn);

router.put(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  userController.updateUser,
);

router.delete(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUser,
);

export default router;
