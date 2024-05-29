import { toast } from "react-toastify";
export const successAlert = (message) => {
  toast.success(message);
};
export const errorAlert = (message) => {
  toast.error(message);
};