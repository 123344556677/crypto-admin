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
export const updateUserInfo= (values) => {
  return api.patch('/user/updateInformation',values);
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
export const addProfitToBalance= (values,id) => {
  return api.patch(`/admin/updateUserBalance/${id}`,values);
};
export const saveSliderImages= (values) => {
  return api.patch('/admin/updateImageSlider',values);
};
export const getSliderImages= () => {
  return api.get('/admin/getImageSlider');
};
export const deleteSliderImage= (id) => {
  return api.delete(`/admin/deleteImageFromSlider/${id}`);
};
export const saveAbout= (values) => {
  return api.patch('/admin/updateAbout',values);
};
export const getAbout= () => {
  return api.get('/admin/getAbout');
};
export const addAnnouncement= (values) => {
  return api.patch('/setting/addAnnouncement',values);
};
export const getAnnouncement= () => {
  return api.get('/setting/getAnnouncement');
};
export const deleteAnnouncement= (id) => {
  return api.delete(`/setting/deleteAnnouncement/${id}`);
};
export const addNumber= (values) => {
  return api.patch('/setting/addPhoneNumber',values);
};
export const getNumber= () => {
  return api.get('setting/getPhoneNumber');
};
export const deleteNumber= (id) => {
  return api.delete(`/setting/deletePhoneNumber/${id}`);
};