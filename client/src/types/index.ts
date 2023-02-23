export interface ICost {
  text: string;
  price: number;
  date: Date | string;
  _id?: number | string;
}

interface IApiBase {
  url: string;
  token: string;
}

export interface ICreateCost extends IApiBase {
  cost: ICost;
}

export interface IGetCosts extends IApiBase {}

export interface IRefreshToken extends IApiBase {
  username: string;
}

export interface IHandleAxiosErrorPayload {
  type: string;
  createCost?: Partial<ICreateCost>;
  getCosts?: Partial<IApiBase>;
}
