import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (msg, type) => {
  toast[type](`${msg}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    closeButton: false,
  });
};

export default notify;
