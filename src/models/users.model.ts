interface IUser {
	id?: string;
	phoneNumber: string;
	accessCode: string;
	expiresAt: number;
}

export default class User implements IUser {
	id: string;
	phoneNumber: string;
	accessCode: string;
	expiresAt: number;

	constructor(phoneNumber: string, accessCode: string) {
		this.id = phoneNumber;
		this.phoneNumber = phoneNumber;
		this.accessCode = accessCode;
		this.expiresAt = Date.now() + 5 * 60 * 1000; // 5 min
	}
}
