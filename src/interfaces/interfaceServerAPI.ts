export interface User {
  name?: string;
  email: string;
  password: string;
}

export interface CreateUserContent {
  id: string;
  name: string;
  email: string;
}

export interface AuthorizationContent {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface WordLocation {
  group: string;
  page: number;
}

export interface WordContent {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface OptionalUserWord {
  dateWhenItBecameLearned?: string | null;
  dateWhenItBecameNew?: string | null;
  gameInWhichItBecameNew?: string | null;
  sprint?: {
    totalCount: number;
    trueCount: number;
  };
  audioCall?: {
    totalCount: number;
    trueCount: number;
  };
}

export interface UserWord {
  token: string;
  id: string;
  wordId?: string;
  difficulty?: string;
  optional?: OptionalUserWord;
}

export interface OptionalUserStatistics {
  [date: string]: {
    sprint: {
      bestStreak: number;
      totalCount: number;
      trueCount: number;
    };
    audioCall: {
      bestStreak: number;
      totalCount: number;
      trueCount: number;
    };
  };
}

export interface UserWordContent {
  id: string;
  difficulty: string;
  wordId: string;
  optional: OptionalUserWord;
}

export type FullWord = WordContent & {
  userWord: UserWordContent;
};

export interface AggregatedWordsRequest {
  id: string;
  group?: string;
  page?: number;
  wordsPerPage: number;
  filter: string;
}

export interface StatisticsContent {
  token?: string;
  id?: string;
  optional: OptionalUserStatistics;
}
