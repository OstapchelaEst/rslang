import {
  AuthorizationContent,
  User,
} from "../../interfaces/interfaceServerAPI";

const axios = require("axios").default;

class SignIn {
  baseUrl = new URL("https://rs-lang-back.onrender.com/");

  signIn = async (user: User) => {
    const url = new URL("signin", this.baseUrl);
    const body: User = user;

    const response = await axios(url.href, {
      method: "post",
      url: url.href,
      data: body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const content: AuthorizationContent = await response.data;
    return content;
  };
}

const signIn = new SignIn();
export default signIn;
