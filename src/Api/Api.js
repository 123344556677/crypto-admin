import { createAxiosInstance, fileInstance } from "./ApiInstances";

const url = process.env.REACT_APP_API_URL;

const api = createAxiosInstance();
const file = fileInstance();

export const login = (values) => {
  return api.post('/user/login', values);
};
export const getApprovedCashDeposits= () => {
  return api.get('/admin/getApprovedCashDeposited');
};
export const getPendingCashDeposits= () => {
  return api.get('/admin/getPendingCashDeposited');
};
export const updateDepositStatus= (id,values) => {
  return api.patch(`/admin/approveCashDeposit/${id}`,values);
};
export const getInformationCounts= () => {
  return api.get('/admin/getInformation');
};