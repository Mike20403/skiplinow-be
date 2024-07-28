import { checkSchema } from 'express-validator';
import { validate } from '~/utils/validation';

export const generateCodeValidator = validate(
    checkSchema(
        {
            phoneNumber: {
                isString: true,
            },
        },
        ['body'],
    ),
);

export const checkCodeValidator = validate(
    checkSchema(
        {
            phoneNumber: {
                isString: true,
            },
            accessCode: {
                isString: true,
            },
        },
        ['body'],
    ),
);
