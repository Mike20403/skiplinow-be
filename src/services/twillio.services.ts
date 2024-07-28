import twilio from 'twilio';
import { envConfig } from '~/constants/config';

export const twilioConfig = {
    accountSid: envConfig.twilioAccountSid,
    authToken: envConfig.twilioAuthToken,
    fromPhoneNumber: envConfig.twilioPhoneNumber,
};

const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

export const sendSMS = async (to: string, body: string): Promise<void> => {
    try {
        await client.messages.create({
            body: body,
            from: twilioConfig.fromPhoneNumber,
            to: to,
        });
        console.log(`SMS sent to ${to}`);
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw new Error('Error sending SMS');
    }
};

export async function createValidationRequest(phoneNumber: string) {
	console.log('===>', phoneNumber);
	const validationRequest = await client.validationRequests.create({
		friendlyName: "Customer phone number validation request",
		phoneNumber: `${phoneNumber}`,
	});
	console.log(validationRequest.accountSid);
}


