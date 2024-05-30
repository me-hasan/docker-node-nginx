import { body, validationResult } from 'express-validator';
import validator from 'validator';
import { SendResponse } from '../../../common/utils/sendResponse.js';
import ThrowError from '../../../common/helpers/ThrowError.js';


export const validCredentials = [
  body('username').custom(value => {
    if (!value.match(/^\+\d{1,3}\d{4,14}$/) && !validator.isEmail(value)) {
      ThrowError.create(400,'Username must be a valid email address or a valid Bangladeshi mobile number');
    }
    return true;
  }),
  // Add more fields as necessary
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      const [ simplifiedErrors ] = errors.array().map(err => err.msg);
      SendResponse(res, 400, null, simplifiedErrors);
      return; // Stop the middleware chain here
    }
    next();
  }
];
