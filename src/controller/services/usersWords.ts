import {
  UserWordContent,
  UserWord,
  OptionalUserWord,
} from "../../interfaces/interfaceServerAPI";

const axios = require("axios").default;

class UsersWords {
  baseUrl = new URL("https://rs-learnwords-example.herokuapp.com");

  getUserWords = async (user: UserWord) => {
    const url = new URL(`users/${user.id}/words`, this.baseUrl);

    const response = await axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
      },
    });

    const content: Array<UserWordContent> = await response.data;
    return content;
  };

  getUserWordByWordId = async (user: UserWord) => {
    const url = new URL(`users/${user.id}/words/${user.wordId}`, this.baseUrl);

    const response = await axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
      },
    });

    const content: UserWordContent = await response.data;
    return content;
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

    const body: {
      difficulty?: string;
      optional?: OptionalUserWord;
    } = {};

    if (userWord.difficulty) {
      body.difficulty = userWord.difficulty;
    }
    if (userWord.optional) {
      body.optional = userWord.optional;
    }

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
