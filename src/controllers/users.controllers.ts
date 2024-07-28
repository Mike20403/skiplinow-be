import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import HTTP_STATUS from '~/constants/http-status';
import { USERS_MESSAGES } from '~/constants/messages';
import { RequestAccessCodeBody, CheckAccessCodeBody } from '~/models/access-code.model';
import { ErrorWithStatus } from '~/models/errors.model';
import User from '~/models/users.model';
import { sendSMS } from '~/services/twillio.services';
import usersService from '~/services/users.services';
import { generateRandomAccessCode } from '~/utils/generate';

export const generateAccessCodeController = async (
	req: Request<ParamsDictionary, any, RequestAccessCodeBody>,
	res: Response,
) => {
    const { phoneNumber } = req.body;
    const accessCode = generateRandomAccessCode();
	//await createValidationRequest(phoneNumber);
    const user = new User(phoneNumber, accessCode);
    await usersService.addOrUpdateUser(user);
    await sendSMS(user.phoneNumber, `Your access code is: ${accessCode}`);
    return res.json({
        message: USERS_MESSAGES.ACCESS_CODE_SENT,
    });
};

export const checkAccessCodeController = async (
	req: Request<ParamsDictionary, any, CheckAccessCodeBody>,
	res: Response,
) => {
	const { phoneNumber, accessCode } = req.body;
	const user: User | undefined = await usersService.getUser(phoneNumber);

	if (!user) {
		throw new ErrorWithStatus({
			message: USERS_MESSAGES.WRONG_PHONE_NUMBER_OR_ACCESS_CODE,
			status: HTTP_STATUS.BAD_REQUEST,
		});
	}

	if (user.accessCode !== accessCode) {
		throw new ErrorWithStatus({
			message: USERS_MESSAGES.WRONG_PHONE_NUMBER_OR_ACCESS_CODE,
			status: HTTP_STATUS.BAD_REQUEST,
		});
	}

	if (user.expiresAt < new Date().getTime()) {
		throw new ErrorWithStatus({
			message: USERS_MESSAGES.ACCESS_CODE_EXPIRED,
			status: HTTP_STATUS.BAD_REQUEST,
		});
	}

	return res.json({
		message: USERS_MESSAGES.ACCESS_CODE_VALIDATED,
		result: user,
	});
};
