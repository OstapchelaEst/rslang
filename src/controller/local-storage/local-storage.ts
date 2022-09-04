import { AuthorizationContent } from "../../interfaces/interfaceServerAPI";

class LocalStorage {
  setUserData(response: AuthorizationContent): void {
    const DATA = JSON.stringify(response);
    localStorage.setItem("user", DATA);
  }
  getDataUser(): AuthorizationContent {
    const DATA = localStorage.getItem("user");
    return DATA === null ? null : JSON.parse(DATA);
  }
  removeDataUser() {
    localStorage.removeItem("user");
  }
  getVocabularyGroup(): string | null {
    return localStorage.getItem("vocabularyGroup");
  }
  setVocabularyGroup(group: string): void {
    localStorage.setItem("vocabularyGroup", group);
  }
}

export const LOCAL_STORAGE = new LocalStorage();
