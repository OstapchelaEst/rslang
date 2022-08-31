import {
  AuthorizationContent,
  FullWord,
  OptionalUserWord,
  UserWord,
  UserWordContent,
} from "../../interfaces/interfaceServerAPI";
import { LOCAL_STORAGE } from "../local-storage/local-storage";
import usersWordsService from "../services/usersWords";

class Difficulty {
  setDifficulty(word: FullWord, difficulty: string): Promise<UserWordContent> {
    return this.createOrUpdateUserWord(
      word,
      difficulty,
      word.userWord?.optional
    );
  }

  addToLearned(word: FullWord) {
    const optional: OptionalUserWord = word.userWord.optional || {};
    optional.dateWhenItBecameLearned = new Date().toISOString();

    return this.createOrUpdateUserWord(word, "easy", optional);
  }

  createOrUpdateUserWord(
    word: FullWord,
    difficulty: string,
    optional: OptionalUserWord
  ): Promise<UserWordContent> {
    const userData: AuthorizationContent = LOCAL_STORAGE.getDataUser();
    const userWord: UserWord = {
      token: userData.token,
      id: userData.userId,
      wordId: word.id,
      difficulty: difficulty,
      optional: optional,
    };
    if (word.userWord) {
      return usersWordsService.updateUserWord(userWord);
    } else {
      return usersWordsService.createUserWord(userWord);
    }
  }
}

export const SET_DIFFICULTY = new Difficulty();
