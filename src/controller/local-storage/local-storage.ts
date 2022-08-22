import { AuthorizationContent } from "../../interfaces/interfaceServerAPI";

class LocalStorage {
  setUserData(response: AuthorizationContent) {
    const DATA = JSON.stringify(response);
    localStorage.setItem("user", DATA);
  }
  getDataUser() {
    const DATA = localStorage.getItem("user");
    return DATA === null ? null : JSON.parse(DATA);
  }
  removeDataUser() {
    localStorage.removeItem("user");
  }
}

export const LOCAL_STORAGE = new LocalStorage();
