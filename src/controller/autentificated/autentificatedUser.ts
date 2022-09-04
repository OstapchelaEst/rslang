import { LOCAL_STORAGE } from "../local-storage/local-storage";
import user from "../services/users";

class AuthenticatedUser {
  async refreshUserToken() {
    const USER_DATA = LOCAL_STORAGE.getDataUser();
    if (USER_DATA && USER_DATA.refreshToken) {
      const NEW_TOKEN = await user.refreshToken(
        USER_DATA.userId,
        USER_DATA.refreshToken
      );
      USER_DATA.token = NEW_TOKEN.token;
      USER_DATA.refreshToken = NEW_TOKEN.refreshToken;
      LOCAL_STORAGE.setUserData(USER_DATA);
    }
  }
}

export const AUTHENTICATED = new AuthenticatedUser();
