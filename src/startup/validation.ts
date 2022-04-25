import assert from "assert";
import Joi, { Root, StringSchema } from "joi";

 interface ExtendedJoiInterface extends Root {
  objectId(): StringSchema;
}

const defaultMessage = "valid mongo id";

function joiObjectId(Joi: Root, message: string) {
  assert(Joi && Joi.object, "you must pass Joi as an argument");
  if (message === undefined) {
    message = defaultMessage;
  }
  return function objectId() {
    return Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);
  };
}

export const validation = () => {
  (Joi as ExtendedJoiInterface).objectId = joiObjectId(Joi, "");
};
