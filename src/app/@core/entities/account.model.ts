// Account model use for storing  user data
export class AccountModel {
    // the ID generated from backend API
    id?: number;
    name: string;
    email: string;
    // the password cannot receive from API, send only
    password?: string;
}
