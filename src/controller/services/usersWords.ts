import { AxiosResponse } from "axios";
import {
  UserWordContent,
  UserWord,
  AuthorizationContent,
} from "../../interfaces/interfaceServerAPI";

const axios = require("axios").default;

class UsersWords {
  baseUrl = new URL("https://rs-lang-back.onrender.com/");

  getUserWords = async (user: AuthorizationContent) => {
    const url = new URL(`users/${user.userId}/words`, this.baseUrl);

    const response = await axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
      },
    });

    const content: Array<UserWordContent> = await response.data;
    return content;
  };

  getUserWord = async (
    id: string,
    wordId: string,
    token: string
  ): Promise<UserWordContent | null> => {
    const url = new URL(`users/${id}/words/${wordId}`, this.baseUrl);

    const response: AxiosResponse = await axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      validateStatus: (status: number) => {
        return status === 200 || status === 404;
      },
    });

    return response.status === 200
      ? <UserWordContent>await response.data
      : null;
  };

  createUserWord = async (userWord: UserWord) => {
    const url = new URL(
      `users/${userWord.id}/words/${userWord.wordId}`,
      this.baseUrl
    );

    const body = {
      difficulty: userWord.difficulty,
      optional: userWord.optional,
    };

    const response = await axios({
      method: "post",
      url: url.href,
      data: body,
      headers: {
        Authorization: `Bearer ${userWord.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const content: UserWordContent = response;
    return content;
  };

  updateUserWord = async (userWord: UserWord) => {
    const url = new URL(
      `users/${userWord.id}/words/${userWord.wordId}`,
      this.baseUrl
    );

    const body = {
      difficulty: userWord.difficulty,
      optional: userWord.optional,
    };

    const response = await axios({
      method: "put",
      url: url.href,
      data: body,
      headers: {
        Authorization: `Bearer ${userWord.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const content: UserWordContent = await response.data;
    return content;
  };
}

const usersWords = new UsersWords();
export default usersWords;
