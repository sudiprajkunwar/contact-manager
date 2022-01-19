export interface IRoutesType {
  path: string;
  title: string;
  component: React.FC;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  full_name: string;
  email: string;
  password: string;
}

export interface ISignupUser extends IRegister {
  onSuccess: () => void;
}

export interface ISigninUser extends ILogin {
  onSuccess: () => void;
}

export interface IContact {
  _id: string;
  user_id: string;
  full_name: string;
  address: string;
  email: string;
  phone: number;
  favourite: number;
}

export interface IUser {
  _id: string;
  full_name: string;
  email: string;
}

export interface IParamsUserId {
  user_id: string;
}
export interface IUserID {
  params: IParamsUserId;
}

export interface IDeleteContact {
  user_id: string;
  _id: string;
  onSuccess?: () => void;
}
