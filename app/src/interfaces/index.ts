export interface IRoutesType {
  path: string;
  title: string;
  icon: string;
  component: React.FC;
  showInMenu: boolean;
}

export interface ILogin {
  username: string;
  password: string;
}
