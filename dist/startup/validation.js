"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const assert_1 = __importDefault(require("assert"));
const joi_1 = __importDefault(require("joi"));
const defaultMessage = "valid mongo id";
function joiObjectId(Joi, message) {
    assert_1.default(Joi && Joi.object, "you must pass Joi as an argument");
    if (message === undefined) {
        message = defaultMessage;
    }
    return function objectId() {
        return Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);
    };
}
const validation = () => {
    joi_1.default.objectId = joiObjectId(joi_1.default, "");
};
exports.validation = validation;
