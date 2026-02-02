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

export interface IChangePassword {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export interface IUpdateProfile {
  userId: string;
  firstName?: string;
  lastName?: string;
  contactNo?: string;
  profileImage?: string;
  position?: string;
}
