import express from 'express';
import {
  getAllInvestors,
  createNewInvestor,
  getOneInvestor,
  updateOneInvestor,
  deleteOneInvestor,
  resendOptNewInvestor,
  resetPasswordInvestor,
  verifyOneInvestorByOtp,
  setPasswordOneInvestor
} from '../../http/controllers/investorController.js';
import { validateNewInvestor } from '../../http/requests/investor/createInvestorRequest.js';
import  uniqueInvestor from '../../http/requests/investor/uniqueInvestorRequest.js';
import { validateUUID } from '../../http/requests/validateUUID.js';

const investorRoutes = express.Router();

investorRoutes.get('/', getAllInvestors);
investorRoutes.get('/:investorId',validateUUID, getOneInvestor);
investorRoutes.post('/', [validateNewInvestor, uniqueInvestor], createNewInvestor);
investorRoutes.patch('/:investorId', updateOneInvestor);
investorRoutes.delete('/:investorId', deleteOneInvestor);
investorRoutes.post('/resend-opt-for-new-investor-by-email-and-phone', resendOptNewInvestor);
investorRoutes.post('/reset-password', resetPasswordInvestor);
investorRoutes.post('/verify-investor-by-otp', verifyOneInvestorByOtp);
investorRoutes.post('/set-password-by-investor-id', setPasswordOneInvestor);

export default investorRoutes;
