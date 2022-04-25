"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePortfolio = exports.patchPortfolio = exports.updatePortfolio = exports.createPortfolio = exports.getPortfolio = exports.getMyPortfolio = exports.getPortfolios = void 0;
const portfolio_1 = require("../models/portfolio");
const user_1 = require("../models/user");
const getPortfolios = async (req, res) => {
    const portfolios = await portfolio_1.Portfolio.find();
    res.send(portfolios);
};
exports.getPortfolios = getPortfolios;
const getMyPortfolio = async (req, res) => {
    const user = await user_1.User.findById(req.user._id);
    const portfolio = await portfolio_1.Portfolio.find({
        user: {
            _id: req.user._id,
            username: user.username,
        },
    });
    res.send(portfolio[0]);
};
exports.getMyPortfolio = getMyPortfolio;
const getPortfolio = async (req, res) => {
    try {
        const portfolio = await portfolio_1.Portfolio.findById(req.params.id);
        // If not existing return 404 - Not found
        if (!portfolio)
            return res
                .status(404)
                .send("The portfolio with the given id was not found.");
        res.send(portfolio);
    }
    catch (e) {
        return res
            .status(404)
            .send("The portfolio with the given id was not found.");
    }
};
exports.getPortfolio = getPortfolio;
const createPortfolio = async (req, res) => {
    // If invalid return 400 - Bad request ////
    const { error } = portfolio_1.validatePortfolio(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const user = await user_1.User.findById(req.body.userId);
    if (!user)
        return res.status(400).send("Invalid user.");
    let portfolio = await portfolio_1.Portfolio.findOne({ userId: req.body.userId });
    if (portfolio)
        return res.status(400).send("Portfolio already created.");
    portfolio = new portfolio_1.Portfolio({
        userId: req.body.userId,
        transactions: req.body.transactions,
        intialValue: req.body.value,
        currentValue: req.body.value,
    });
    await portfolio.save();
    res.send(portfolio);
};
exports.createPortfolio = createPortfolio;
const updatePortfolio = async (req, res) => {
    // If invalid return 400 - Bad request
    const { error } = portfolio_1.validatePortfolio(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const user = await user_1.User.findById(req.body.userId);
    if (!user)
        return res.status(400).send("Invalid user.");
    const portfolio = await portfolio_1.Portfolio.findByIdAndUpdate(req.params.id, {
        userId: req.body.userId,
        transactions: req.body.transactions,
        intialValue: req.body.intialValue,
        currentValue: req.body.value,
    }, { new: true });
    // If not existing return 404 - Not found
    if (!portfolio)
        return res
            .status(404)
            .send("The portfolio with the given id was not found.");
    res.send(portfolio);
};
exports.updatePortfolio = updatePortfolio;
const patchPortfolio = async (req, res) => {
    const portfolio = await portfolio_1.Portfolio.findById(req.params.id);
    if (!portfolio)
        return res
            .status(404)
            .send("The portfolio with the given ID was not found.");
    let query = { $set: {} };
    for (let key in req.body) {
        if ((portfolio[key] || portfolio[key] === 0) &&
            portfolio[key] !== req.body[key])
            query.$set[key] = req.body[key];
        await portfolio_1.Portfolio.updateOne({ _id: req.params.id }, query, {
            runValidators: true,
        });
    }
    res.send(query);
};
exports.patchPortfolio = patchPortfolio;
const deletePortfolio = async (req, res) => {
    try {
        const portfolio = await portfolio_1.Portfolio.findByIdAndRemove(req.params.id);
        // If not existing return 404 - Not found
        if (!portfolio)
            return res
                .status(404)
                .send("The portfolio with the given id was not found.");
        res.send(portfolio);
    }
    catch (e) {
        return res
            .status(404)
            .send("The portfolio with the given id was not found.");
    }
};
exports.deletePortfolio = deletePortfolio;
