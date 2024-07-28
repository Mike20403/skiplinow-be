export interface RequestAccessCodeBody {
    phoneNumber: string;
}

export interface CheckAccessCodeBody {
    phoneNumber: string;
    accessCode: string;
}
