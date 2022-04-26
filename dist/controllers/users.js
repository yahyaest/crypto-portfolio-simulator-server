"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.patchUser = exports.updateUser = exports.createUser = exports.userLogin = exports.getUser = exports.getConnectedUser = exports.getUsers = void 0;
const user_1 = require("../models/user");
const getUsers = async (req, res) => {
    const users = await user_1.User.find().sort("username");
    res.send(users);
};
exports.getUsers = getUsers;
const getConnectedUser = async (req, res) => {
    const user = await user_1.User.findById(req.user._id);
    res.send(user);
};
exports.getConnectedUser = getConnectedUser;
const getUser = async (req, res) => {
    try {
        const user = await user_1.User.find({ email: req.body.email });
        if (!user)
            return res.status(404).send("The user with the given email was not found.");
        res.send(user);
    }
    catch (e) {
        return res.status(404).send("The user with the given email was not found.");
    }
};
exports.getUser = getUser;
const userLogin = async (req, res) => {
    try {
        const user = await user_1.User.find({
            email: req.body.email,
            password: req.body.password,
        });
        if (user.length === 0)
            return res.status(404).send("The user was not found.");
        res.send(user);
    }
    catch (e) {
        return res.status(404).send("The user was not found.");
    }
};
exports.userLogin = userLogin;
const createUser = async (req, res) => {
    const { error } = user_1.validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let user = await user_1.User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send("User already registered.");
    user = new user_1.User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    await user.save();
    res.send(user);
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    const { error } = user_1.validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const user = await user_1.User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }, { new: true });
    if (!user)
        return res.status(404).send("The user with the given id was not found.");
    res.send(user);
};
exports.updateUser = updateUser;
const patchUser = async (req, res) => {
    const user = await user_1.User.findById(req.params.id);
    if (!user)
        return res.status(404).send("The user with the given ID was not found.");
    let query = { $set: {} };
    for (let key in req.body) {
        if (user[key] && user[key] !== req.body[key])
            query.$set[key] = req.body[key];
        await user_1.User.updateOne({ _id: req.params.id }, query, {
            runValidators: true,
        });
    }
    res.send(query);
};
exports.patchUser = patchUser;
const deleteUser = async (req, res) => {
    try {
        const user = await user_1.User.findByIdAndRemove(req.params.id);
        if (!user)
            return res.status(404).send("The user with the given id was not found.");
        res.send(user);
    }
    catch (e) {
        return res.status(404).send("The user with the given id was not found.");
    }
};
exports.deleteUser = deleteUser;
