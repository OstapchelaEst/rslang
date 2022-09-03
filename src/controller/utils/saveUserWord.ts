import {
  AuthorizationContent,
  FullWord,
  OptionalUserWord,
  UserWord,
  UserWordContent,
} from "../../interfaces/interfaceServerAPI";
import { LOCAL_STORAGE } from "../local-storage/local-storage";
import usersWordsService from "../services/usersWords";

export const saveUserWord = async (
  word: FullWord,
  data: { difficulty?: string; optional?: OptionalUserWord }
): Promise<UserWordContent> => {
  const userData: AuthorizationContent = LOCAL_STORAGE.getDataUser();

  let userWord: UserWordContent | null = word.userWord;
  if (!userWord) {
    userWord = await usersWordsService.getUserWord(
      userData.userId,
      word.id,
      userData.token
    );
  }

  let difficulty = userWord?.difficulty || "easy";
  const optional = userWord?.optional || {};

  if (data.difficulty) {
    difficulty = data.difficulty;
  }

  if (data.optional) {
    Object.assign(optional, data.optional);
  }

  const request: UserWord = {
    token: userData.token,
    id: userData.userId,
    wordId: word.id,
    difficulty: difficulty,
    optional: optional,
  };

  if (userWord) {
    return usersWordsService.updateUserWord(request);
  } else {
    return usersWordsService.createUserWord(request);
  }
};
