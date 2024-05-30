import { body, validationResult } from 'express-validator';
import { SendResponse } from '../../../common/utils/sendResponse.js';

export const validateNewInvestor = [
  body('email').isEmail().withMessage('Email must be a valid email address'),
  body('phone').matches(/^\d{1,10}$/).withMessage('Phone must be a valid Bangladeshi mobile number'),
  body('dialCode').matches(/^\+\d{1,3}$/).withMessage('Dial code must be a valid'),
  // Add more fields as necessary
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Extract only the message from each error
      const [ simplifiedErrors ] = errors.array().map(err => err.msg);
      SendResponse(res, 401, null, simplifiedErrors);
      return; // Stop the middleware chain here
    }
    next();
  }
];
