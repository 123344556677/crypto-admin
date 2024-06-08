import { createAxiosInstance } from "./ApiInstances";


const api = createAxiosInstance();

export const login = (values) => {
  return api.post('/user/login', values);
};
export const getApprovedCashDeposits= () => {
  return api.get('/admin/getApprovedCashDeposited');
};
export const getAllUsers= () => {
  return api.get('/admin/getAllUsers');
};
export const getUser = (id) => {
  return api.get(`/user/getUser/${id}`);
};
export const deleteUser= (id) => {
  return api.delete(`/admin/deleteUser/${id}`);
};

export const getPendingCashDeposits= () => {
  return api.get('/admin/getPendingCashDeposited');
};
export const updateDepositStatus= (id,values) => {
  return api.patch(`/admin/approveCashDeposit/${id}`,values);
};
export const deleteDeposit= (id) => {
  return api.delete(`/admin/deleteCashDeposit/${id}`);
};
export const getInformationCounts= () => {
  return api.get('/admin/getInformation');
};
export const getApprovedCashWithdrawal= () => {
  return api.get('/admin/getApprovedCashWithDrawal');
};
export const getPendingCashWithdrawal= () => {
  return api.get('/admin/getPendingCashWithDrawal');
};
export const updateWithdrawalStatus= (id,values) => {
  return api.patch(`/admin/approveCashWithDrawal/${id}`,values);
};
export const deleteWithdrawal= (id) => {
  return api.delete(`/admin/deleteCashWithDrawal/${id}`);
};
export const updateWalletAddress= (id,values) => {
  return api.patch(`/admin/updateWalletAddress/${id}`,values);
};
export const updateUserInfo= (values) => {
  return api.patch(`/user/updateInformation`,values);
};