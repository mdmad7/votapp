import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/users', (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) {
      res.json('error has occurred');
    } else {
      res.json(users);
    }
  });
});

router.get('/user/:id', (req, res) => {
  User.findOne({
    _id: req.params.id,
  }).exec((err, user) => {
    if (err) {
      res.json('an error occurred');
    } else {
      res.json(user);
    }
  });
});

router.post('/user', (req, res) => {
  const newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    other_names: req.body.other_names,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  newUser.save((err, user) => {
    if (err) {
      res.json('an error occurred');
    }

    res.json(user);
  });
});

router.put('/user/:id', (req, res) => {
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    other_names: req.body.other_names,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    _id: req.params.id,
  });
  User.findOneAndUpdate(
    req.params.id,
    user,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.json('an error occurred');
      }

      res.json(updatedUser);
    },
  );
});

router.delete('/user/:id', (req, res) => {
  User.findOneAndRemove(req.params.id, (err, user) => {
    if (err) {
      res.json('an error occurred');
    }
    res.json(user);
  });
});

export default router;
