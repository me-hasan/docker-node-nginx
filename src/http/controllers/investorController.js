import {
  allInvestors,
  showInvestor,
  createInvestor,
  updateInvestor,
  deleteInvestor,
  findInvestorByEmailAndPhone,
  findActiveInvestorByEmailAndPhone,
  verifyInvestorByOtp,
  sendOptThroughSmsOrEmail,
  setPasswordByInvestor,
  aliveOtp
} from '../../services/investorService.js';
import { generateOtpAndStore } from '../../services/sendOtpService.js';
import { ControllerWrapper } from '../../common/utils/controllerWrapper.js';
import { SendResponse } from '../../common/utils/sendResponse.js';
import  { OtpHelper } from '../../common/helpers/OtpHelper.js';

export const getAllInvestors = ControllerWrapper(async (req, res) => {
    const investors = await allInvestors(); 
    SendResponse(res, 200, investors);
});

export const getOneInvestor = ControllerWrapper(async (req, res) => {
    const investor = await showInvestor(req.params.investorId);
    if(!investor){
      SendResponse(res, 404, null, 'Investor not found!');
    }
    SendResponse(res, 201, investor);
});

export const createNewInvestor = ControllerWrapper(async (req, res) => {
    const newInvestorData = req.body;
    const createdInvestor = await createInvestor(newInvestorData);
    const aliveOtpData = await aliveOtp(createdInvestor);

    let message;
    const otpValidity = OtpHelper.checkOtpValidity(aliveOtpData);

    if (otpValidity.isValid) {
        message = `Please try after ${otpValidity.remainingTime} minute(s) or check your registered email or mobile for the OTP.`;
    } else {
        message = await handleNewOtp(createdInvestor);
    }
    SendResponse(res, 201, createdInvestor, message);
});

export const resendOptNewInvestor = ControllerWrapper(async (req, res) => {
    const { email, phone } = req.body;
    const existInvestor = await findInvestorByEmailAndPhone(email, phone);
    if(!existInvestor){
      SendResponse(res, 404, null, 'Email or phone is not valid.');
      return;
    }
    const aliveOtpData = await aliveOtp(existInvestor);

    let message;
    const otpValidity = OtpHelper.checkOtpValidity(aliveOtpData);

    if (otpValidity.isValid) {
        message = `Please try after ${otpValidity.remainingTime} minute(s) or check your registered email or mobile for the OTP.`;
    } else {
        message = await handleNewOtp(existInvestor);
    }
    SendResponse(res, 200, existInvestor, message);
});

export const resetPasswordInvestor = ControllerWrapper(async (req, res) => {
    const { email, phone } = req.body;
    const existInvestor = await findActiveInvestorByEmailAndPhone(email, phone);
    if(!existInvestor){
      SendResponse(res, 404, null, 'Email or phone is not valid.');
    }
    const otpNumber = await generateOtpAndStore(existInvestor);
    await sendOptThroughSmsOrEmail(existInvestor, otpNumber);
    SendResponse(res, 200, existInvestor);
});

export const updateOneInvestor = ControllerWrapper(async (req, res) => {
    const changes = req.body;
    const investorId = req.params.investorId;
    
    const updatedInvestor = await updateInvestor(investorId, changes);

    // Assuming you want to send the hashed password back
    if (updatedInvestor) {
      SendResponse(res, 200, updatedInvestor);
    } else {
      SendResponse(res, 404, null, 'Investor not found');
    }
});

export const deleteOneInvestor = ControllerWrapper(async (req, res) => {
  const investorId = req.params.investorId;
  if (!investorId) {
      SendResponse(res, 500, null, 'Investor ID cannot be empty');
      return;
  }
  const status = await deleteInvestor(investorId);
  if (!status) {
      SendResponse(res, 404, null, 'Investor not found');
      return;
  }
  SendResponse(res, 200, status, 'Investor has been deleted!');
});

export const verifyOneInvestorByOtp = ControllerWrapper(async (req, res) => {
    const { investor_id: investorId, otp } = req.body;

    const verifyInvestor = await verifyInvestorByOtp(investorId, otp);

    if (verifyInvestor) {
      SendResponse(res, 201, null, 'Investor is verified');
    } else {
      SendResponse(res, 404, null, 'Otp is not valid');
    }
});


export const setPasswordOneInvestor = ControllerWrapper(async (req, res) => {
    const { investor_id: investorId, password, confirm_password } = req.body;

    // Check if password and confirm_password are the same
    if (password !== confirm_password) {
        SendResponse(res, 400, null, 'Confirm passwords do not match.');
    }
    
    // Use hashedPassword instead of password for updating the investor
    const updatedInvestor = await setPasswordByInvestor(investorId, password);

    if (updatedInvestor) {
      SendResponse(res, 200, updatedInvestor);
    } else {
      SendResponse(res, 404, null, 'Investor not found.');
    }
});

const handleNewOtp = async (investor) => {
  const otpNumber = await generateOtpAndStore(investor);
  await sendOptThroughSmsOrEmail(investor, otpNumber);
  return 'A new OTP has been sent to your registered email or mobile.';
};




