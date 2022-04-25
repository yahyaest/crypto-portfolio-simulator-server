import { Portfolio, validatePortfolio } from "../models/portfolio";
import { User } from "../models/user";
import { RequestHandler, Response } from "express";

export interface GetUserInfoRequest extends Request {
  user: {
    _id?: string | number;
  };
}

export const getPortfolios: RequestHandler = async (req, res) => {
  const portfolios = await Portfolio.find();
  res.send(portfolios);
};

export const getMyPortfolio = async (
  req: GetUserInfoRequest,
  res: Response
) => {
  const user = await User.findById(req.user._id);
  const portfolio = await Portfolio.find({
    user: {
      _id: req.user._id,
      username: user!.username,
    },
  });

  res.send(portfolio[0]);
};

export const getPortfolio: RequestHandler = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    // If not existing return 404 - Not found
    if (!portfolio)
      return res
        .status(404)
        .send("The portfolio with the given id was not found.");
    res.send(portfolio);
  } catch (e) {
    return res
      .status(404)
      .send("The portfolio with the given id was not found.");
  }
};

export const createPortfolio: RequestHandler = async (req, res) => {
  // If invalid return 400 - Bad request ////
  const { error } = validatePortfolio(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  let portfolio = await Portfolio.findOne({ userId: req.body.userId });
  if (portfolio) return res.status(400).send("Portfolio already created.");

  portfolio = new Portfolio({
    userId: req.body.userId,
    transactions: req.body.transactions,
    intialValue: req.body.value,
    currentValue: req.body.value,
  });

  await portfolio.save();
  res.send(portfolio);
};

export const updatePortfolio: RequestHandler = async (req, res) => {
  // If invalid return 400 - Bad request
  const { error } = validatePortfolio(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  const portfolio = await Portfolio.findByIdAndUpdate(
    req.params.id,
    {
      userId: req.body.userId,
      transactions: req.body.transactions,
      intialValue: req.body.intialValue,
      currentValue: req.body.value,
    },
    { new: true }
  );

  // If not existing return 404 - Not found
  if (!portfolio)
    return res
      .status(404)
      .send("The portfolio with the given id was not found.");
  res.send(portfolio);
};

export const patchPortfolio: RequestHandler = async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);
  if (!portfolio)
    return res
      .status(404)
      .send("The portfolio with the given ID was not found.");

  let query: { $set: { [key: string]: any } } = { $set: {} };
  for (let key in req.body) {
    if (
      (portfolio[key] || portfolio[key] === 0) &&
      portfolio[key] !== req.body[key]
    )
 
      query.$set[key] = req.body[key];
    await Portfolio.updateOne({ _id: req.params.id }, query, {
      runValidators: true,
    });
  }
  res.send(query);
};

export const deletePortfolio: RequestHandler = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndRemove(req.params.id);

    // If not existing return 404 - Not found
    if (!portfolio)
      return res
        .status(404)
        .send("The portfolio with the given id was not found.");

    res.send(portfolio);
  } catch (e) {
    return res
      .status(404)
      .send("The portfolio with the given id was not found.");
  }
};
