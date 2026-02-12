import axios from "axios";
import { showErrorToast } from "./toast";

export const APP_VERSION = "0.0.2";
document.title = "VOC | Admin " + APP_VERSION;

var BASE_URL = import.meta.env.VITE_BASE_URL || "https://api.vocindia.net/";
var WS_URL = import.meta.env.VITE_WS_URL || "wss://api.vocindia.net/";

export const setBasicConfig = async () => {
  // await api.get("api/public/admin/config").then(() => {});
  // const id = localStorage.getItem("accesLogId") ?? "";
  // const host = window.location.hostname ?? "";
  // api
  //   .get(`api/app/users/status?id=${id}&host=${host}`)
  //   .then((res) => localStorage.setItem("statusId", res.data.id))
  //   .catch((e) => console.log(e));
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken") || "";
    if (token) config.headers.Authorization = token;
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.setItem("authToken", "");
      window.location.href = "/auth/login";
    }
    let msg = "";
    if (axios.isAxiosError(error)) {
      msg = error.response?.data?.message || error.message;
    } else {
      msg = "Unexpected Error:";
    }
    if (typeof msg === "object") {
      try {
        const firstField = Object.keys(msg)[0];
        msg = msg[firstField][0];
      } catch (error) {}
    }
    showErrorToast(msg);
    return Promise.reject(error);
  },
);

export { api };

const ws = new WebSocket(WS_URL);
ws.onopen = () => {};
ws.onmessage = (event) => {
  switch (JSON.parse(event.data).type) {
    case "NEW_CONTACT":
      // loadContactUs();
      break;
    case "NEW_ENQUIRY":
      // loadEnquires();
      break;
    case "NEW_JOIN_TEAM":
      // loadJoinTeam();
      break;
    default:
      break;
  }
};
ws.onclose = () => {};
