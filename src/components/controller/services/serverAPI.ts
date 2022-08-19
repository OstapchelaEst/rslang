import * as interfaceServer from "./components/interfaces/interfaceServerAPI";

const axios = require("axios").default;

export default class ServerAPI {
  baseUrl = new URL("https://rslang-app-2022.herokuapp.com/");

  signIn = async ({ email, password }: { email: string; password: string }) => {
    const url = new URL("signin", this.baseUrl);
    const body = { email, password };

    const response = await axios(url.href, {
      method: "post",
      url: url.href,
      data: body,
      headers: {
        Accept: "application/json",
        "Content-Type': 'application/json"
      }
    });

    const content: interfaceServer.AuthorizationContent = await response.data;
    return content;
  };

  getWords = async ({ group, page }: { group: number; page: number }) => {
    const url = new URL("words", this.baseUrl);
    url.searchParams.set("group", String(group));
    url.searchParams.set("page", String(page));

    const response = await axios.get(url.href, {
      headers: {
        Accept: "application/json"
      }
    });

    const content: Array<interfaceServer.WordContent> = await response.data;
    return content;
  };

  getWordByWordId = async ({ wordId }: { wordId: string }) => {
    const url = new URL(`words/${wordId}`, this.baseUrl);

    const response = await axios.get(url.href, {
      headers: {
        Accept: "application/json"
      }
    });

    const content: interfaceServer.WordContent = await response.data;
    return content;
  };

  createUser = async (user: interfaceServer.User) => {
    const url = new URL("users", this.baseUrl);

    const response = await axios({
      method: "post",
      url: url.href,
      data: user,
      headers: {
        Accept: "application/json",
        "Content-Type': 'application/json"
      }      
    });

    const content: interfaceServer.CreateUserContent = await response;
    return content;
  };

  getUser = async ({ token, id }: { token: string; id: string }) => {
    const url = new URL(`users/${id}`, this.baseUrl);

    const response = await axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    const content: { id: string; name: string; email: string } = await response.data;
    return content;
  };

  getUserWords = async ({ token, id }: { token: string; id: string }) => {
    const url = new URL(`users/${id}/words`, this.baseUrl);

    const response = await axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    const content: Array<interfaceServer.UserWordContent> = await response.data;
    return content;
  };

  getUserWordByWordId = async ({
    token,
    id,
    wordId
  }: {
    token: string;
    id: string;
    wordId: string;
  }) => {
    const url = new URL(`users/${id}/words/${wordId}`, this.baseUrl);

    const response = await axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    const content: interfaceServer.UserWordContent = await response.data;
    return content;
  };

  createUserWord = async ({
    token,
    id,
    wordId,
    difficulty,
    optional
  }: {
    token: string;
    id: string;
    wordId: string;
    difficulty: string;
    optional: interfaceServer.OptionalUserWord;
  }) => {
    const url = new URL(`users/${id}/words/${wordId}`, this.baseUrl);

    const body = {
      difficulty,
      optional
    };

    const response = await axios({
      method: "post",
      url: url.href,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type': 'application/json"
      }
    });

    const content: interfaceServer.UserWordContent = response;
    return content;
  };

  updateUserWord = async ({
    token,
    id,
    wordId,
    difficulty,
    optional
  }: {
    token: string;
    id: string;
    wordId: string;
    difficulty?: string;
    optional?: interfaceServer.OptionalUserWord;
  }) => {
    const url = new URL(`users/${id}/words/${wordId}`, this.baseUrl);

    const body: {
      difficulty?: string;
      optional?: interfaceServer.OptionalUserWord;
    } = {};

    if (difficulty) {
      body.difficulty = difficulty;
    }
    if (optional) {
      body.optional = optional;
    }

    const response = await axios({
      method: "put",
      url: url.href,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type': 'application/json"
      }
    });

    const content: interfaceServer.UserWordContent = await response.data;
    return content;
  };

  getStatistics = async ({ token, id }: { token: string; id: string }) => {
    const url = new URL(`users/${id}/statistics`, this.baseUrl);

    const response = await axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    const content: interfaceServer.StatisticsContent = await response.data;
    return content;
  };

  createStatistics = async ({
    token,
    id,
    optional
  }: {
    token: string;
    id: string;
    optional: interfaceServer.OptionalUserStatistics;
  }) => {
    const url = new URL(`users/${id}/statistics`, this.baseUrl);
    const body = { optional };

    const response = await axios({
      method: "put",
      url: url.href,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type': 'application/json"
      }
    });

    const content: interfaceServer.StatisticsContent = await response.data;
    return content;
  };
}
