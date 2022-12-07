import { toast as reactToast } from "react-toastify";

export const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
} as const;

export const toast = {
  error: (message: string, config = toastConfig) => reactToast.error(`${message} Please contact support`, config),
};
