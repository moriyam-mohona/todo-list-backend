export interface IUser {
  email: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  isAgreed: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}
