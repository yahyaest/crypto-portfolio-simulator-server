import { User, validateUser } from "../models/user";
import { RequestHandler, Response } from "express";

export interface GetUserInfoRequest extends Request {
  user: {
    _id?: string | number;
  };
}

export const getUsers: RequestHandler = async (req, res) => {
  const users = await User.find().sort("username");
  res.send(users);
};

export const getConnectedUser = async (
  req: GetUserInfoRequest,
  res: Response
) => {
  const user = await User.findById(req.user._id);
  res.send(user);
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (!user)
      return res.status(404).send("The user with the given email was not found.");
    res.send(user);
  } catch (e) {
    return res.status(404).send("The user with the given email was not found.");
  }
};

export const userLogin: RequestHandler = async (req, res) => {
  try {
    const user = await User.find({
      email: req.body.email,
      password: req.body.password,
    });
    if (user.length === 0)
      return res.status(404).send("The user was not found.");
    res.send(user);
  } catch (e) {
    return res.status(404).send("The user was not found.");
  }
};

export const createUser: RequestHandler = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();
  res.send(user);
};

export const updateUser: RequestHandler = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given id was not found.");

  res.send(user);
};

export const patchUser: RequestHandler = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  let query: { $set: { [key: string]: any } } = { $set: {} };
  for (let key in req.body) {
    if (user[key] && user[key] !== req.body[key])
      query.$set[key] = req.body[key];

    await User.updateOne({ _id: req.params.id }, query, {
      runValidators: true,
    });
  }
  res.send(query);
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user)
      return res.status(404).send("The user with the given id was not found.");

    res.send(user);
  } catch (e) {
    return res.status(404).send("The user with the given id was not found.");
  }
};
