import { checkSchema } from 'express-validator';
import { validate } from '~/utils/validation';

export const generatePostCaptionValidator = validate(
	checkSchema(
		{
			social: {
				isString: true,
			},
			subject: {
				isString: true,
			},
			tone: {
				isString: true,
			},
		},
		['body'],
	),
);

export const generatePostIdeaValidator = validate(
	checkSchema(
		{
			topic: {
				isString: true,
			},
		},
		['body'],
	),
);

export const generateCaptionsFromIdeaValidator = validate(
	checkSchema(
		{
			idea: {
				isString: true,
			},
		},
		['body'],
	),
);
