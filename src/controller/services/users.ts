import {
  User,
  CreateUserContent,
  UserWord,
} from "../../interfaces/interfaceServerAPI";

const axios = require("axios").default;

class Users {
  baseUrl = new URL("https://rs-learnwords-example.herokuapp.com/");
  
  createUser = async (user: User) => {
    const url = new URL("users", this.baseUrl);

    const response = await axios({
      method: "post",
      url: url.href,
      data: user,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const content: CreateUserContent = await response;
    return content;
  };

  getUser = async (user: UserWord) => {
    const url = new URL(`users/${user.id}`, this.baseUrl);

    const response = await axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
      },
    });

    const content: { id: string; name: string; email: string } =
      await response.data;
    return content;
  };
}

const user = new Users();
export default user;
