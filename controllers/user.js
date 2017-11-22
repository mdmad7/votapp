import JWT from 'jsonwebtoken';
import passport from 'passport';
import config from '../configuration';
import User from '../models/user';

const signToken = user => {
  return JWT.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    },
    config.JWT_SECRET,
    {
      expiresIn: '1hr',
    },
  );
};

export const allUsers = async (req, res) => {
  await User.find({}).exec((err, users) => {
    if (err) {
      res.json('error has occurred');
    } else {
      res.json(users);
    }
  });
};

export const userProfile = async (req, res) => {
  await User.findOne({
    _id: req.params.id,
  }).exec((err, user) => {
    if (err) {
      res.json('an error occurred');
    } else {
      res.json(user);
    }
  });
};

export const logIn = async (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      res.json({ error: 'authentication failed' });
    }
    if (!user) {
      return res.json({ error: 'Invalid email address or password' });
    }

    const token = signToken(user);
    return res.status(200).json({ message: 'You are logged In', token });
  })(req, res);
};

export const createUser = async (req, res) => {
  const {
    first_name,
    last_name,
    other_names,
    email,
    password,
    role,
  } = req.body;

  const foundUser = await User.findOne({ email });

  if (foundUser) {
    return res.status(401).json({ error: 'Email is already is use' });
  }

  const newUser = new User({
    first_name,
    last_name,
    other_names,
    email,
    password,
    role,
  });

  await newUser.save();

  const token = await signToken(newUser);
  return res.status(200).json({ token });
};

export const updateUser = (req, res) => {
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
};

export const deleteUser = (req, res) => {
  User.findOneAndRemove(req.params.id, (err, user) => {
    if (err) {
      res.json('an error occurred');
    }
    res.json(user);
  });
};
