import {revokeVerifyToken, login, revokeAndGenerateAccessToken} from '../../services/authService.js';
import { ControllerWrapper } from '../../common/utils/controllerWrapper.js';
import { SendResponse } from '../../common/utils/sendResponse.js';


export const loginInvestor = ControllerWrapper(async (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
    const loginInfo = await login(userName, password);
    SendResponse(res, 200, loginInfo);
});

export const verifyToken = ControllerWrapper(async (req, res) => {
    const { token : token } = req.body;
    const data = await revokeVerifyToken(token);
    SendResponse(res, 200, data);
});

export const refreshToken = ControllerWrapper(async (req, res) => {
    const { token : token } = req.body;
    const data = await revokeAndGenerateAccessToken(token);
    SendResponse(res, 200, data);
});






