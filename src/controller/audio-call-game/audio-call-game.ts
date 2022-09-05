import {
  FullWord,
  OptionalUserWord,
  UserWordContent,
} from "../../interfaces/interfaceServerAPI";
import { IStatistic } from "../../interfaces/caudio-call-game";
import { AUDIO_CALL_RENDER } from "../../pages/audio-call-game/audio-game-render";
import { COMPONENT_LOAD_SCREAN } from "../../components/load-screan/load-screan";
import words from "../services/words";
import usersWordsService from "../services/usersWords";
import { KEY_BOARD } from "./key-board";
import { SONG_AUDIO_CALL } from "./song-audio-call";
import { LOCAL_STORAGE } from "../local-storage/local-storage";
import usersWords from "../services/usersWords";
import { AUDIO_CALL_STATISTIC } from "./audio-call-statistic";

class AudioGame {
  statusAudio: string;
  statusScrean: string;
  data: FullWord[];
  page: number;
  wordNumber: number;
  statistic: IStatistic[];
  bestStreak: number;
  totalCount: number;
  trueCount: number;
  curentStreack: number;
  constructor() {
    this.statusAudio = "";
    this.statusScrean = "";
    this.bestStreak = 0;
    this.curentStreack = 0;
    this.totalCount = 0;
    this.trueCount = 0;
    this.data = [];
    this.page = 0;
    this.wordNumber = 0;
    this.statistic = [
      {
        word: "string",
        wordTranslate: "string",
        choise: true,
      },
    ];
  }

  AudioCallListenerStart() {
    (<HTMLButtonElement>(
      document.querySelector(".audio-call-rules__button")
    )).addEventListener("click", this.startGame);
  }

  async startGame() {
    COMPONENT_LOAD_SCREAN.renderLoadScrean();
    AUDIO_CALL_GAME.resetValues();
    AUDIO_CALL_GAME.page = Math.floor(Math.random() * 30);
    const GROUP_WORDS = Number(
      (<HTMLFormElement>document.querySelector(".audio-call-rules__select"))
        .value
    );
    AUDIO_CALL_GAME.data = (
      await words.getWords({ group: GROUP_WORDS, page: AUDIO_CALL_GAME.page })
    ).sort(() => Math.random() - 0.5);

    const USER_DATA = LOCAL_STORAGE.getDataUser();
    if (USER_DATA) {
      const USER_WORDS: UserWordContent[] =
        await usersWordsService.getUserWords(LOCAL_STORAGE.getDataUser());

      AUDIO_CALL_GAME.data.forEach((e) => {
        USER_WORDS.forEach((pageWord) => {
          if (e.id === pageWord.wordId) {
            e.userWord = pageWord;
          }
        });
      });
    }
    COMPONENT_LOAD_SCREAN.removeLoadScrean();
    AUDIO_CALL_GAME.treatmentData(AUDIO_CALL_GAME.data);
  }

  async startGameFromVocabulary(data: FullWord[], page: number, group: number) {
    if (LOCAL_STORAGE.getDataUser()) {
      COMPONENT_LOAD_SCREAN.renderLoadScrean();
      AUDIO_CALL_GAME.resetValues();
      AUDIO_CALL_GAME.page = page;
      const FILTRED_DATA = this.filterData(data);
      if (FILTRED_DATA.length === 0) {
        group === 6
          ? AUDIO_CALL_RENDER.renderNoDifficultWords()
          : AUDIO_CALL_RENDER.renderMoveOn();
        COMPONENT_LOAD_SCREAN.removeLoadScrean();
        return;
      }

      if (FILTRED_DATA.length != 20 && group !== 6) {
        await AUDIO_CALL_GAME.getNidedWords(
          group,
          AUDIO_CALL_GAME.page,
          20 - FILTRED_DATA.length
        ).then((datas: FullWord[]) => {
          AUDIO_CALL_GAME.data = FILTRED_DATA.concat(datas);
        });
      } else {
        AUDIO_CALL_GAME.data = FILTRED_DATA;
      }

      AUDIO_CALL_GAME.treatmentData(AUDIO_CALL_GAME.data);
      COMPONENT_LOAD_SCREAN.removeLoadScrean();
    } else {
      AUDIO_CALL_GAME.resetValues();
      AUDIO_CALL_GAME.page = page;
      AUDIO_CALL_GAME.wordNumber = 0;
      AUDIO_CALL_GAME.data = data;
      AUDIO_CALL_GAME.treatmentData(data);
    }
  }

  async getNidedWords(
    group: number,
    page: number,
    countNided: number,
    neddedWords: FullWord[] = []
  ): Promise<FullWord[]> {
    if (group === 0 && page === 0) return neddedWords;
    if (page === 0) {
      group--;
      page = 29;
    } else {
      page--;
    }

    const BEFORE_PAGE_WORDS = await words.getWords({
      group: group,
      page: page,
    });

    const USER_WORDS: UserWordContent[] = await usersWordsService.getUserWords(
      LOCAL_STORAGE.getDataUser()
    );

    BEFORE_PAGE_WORDS.forEach((userWord) => {
      USER_WORDS.forEach((pageWord) => {
        if (userWord.id === pageWord.wordId) {
          userWord.userWord = pageWord;
        }
      });
    });

    neddedWords = neddedWords.concat(this.filterData(BEFORE_PAGE_WORDS));

    return neddedWords.length < countNided
      ? this.getNidedWords(
          group,
          page,
          countNided - neddedWords.length,
          neddedWords
        )
      : neddedWords.slice(0, countNided);
  }

  filterData(data: FullWord[]): FullWord[] {
    const result = data.filter((a) => {
      return a.userWord?.optional?.dateWhenItBecameLearned ? false : true;
    });
    return result;
  }

  async treatmentData(data: FullWord[]) {
    if (LOCAL_STORAGE.getDataUser()) {
      const USER_WORDS: UserWordContent[] =
        await usersWordsService.getUserWords(LOCAL_STORAGE.getDataUser());

      AUDIO_CALL_GAME.data.forEach((e) => {
        USER_WORDS.forEach((pageWord) => {
          if (e.id === pageWord.wordId) {
            e.userWord = pageWord;
          }
        });
      });
    }
    const NUMBERS_WORDS = Array(data.length)
      .fill(0)
      .map((a, i) => a + i)
      .filter((a) => a !== this.wordNumber)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    NUMBERS_WORDS.push(this.wordNumber);
    NUMBERS_WORDS.sort(() => Math.random() - 0.5);

    AUDIO_CALL_RENDER.renderGame(data, NUMBERS_WORDS, this.wordNumber);
    this.addListenersChoise();
    SONG_AUDIO_CALL.playWord();
    SONG_AUDIO_CALL.addListenerPlayWord();
    KEY_BOARD.addKeyBoardChoiseListener();
  }

  addListenersChoise() {
    document.querySelectorAll("[data-choise]").forEach((e) => {
      e.addEventListener("click", (e) =>
        this.userChoise(e.target as HTMLButtonElement)
      );
    });
  }

  async userChoise(button: HTMLButtonElement) {
    this.showNextButton();
    const USER_INFO = LOCAL_STORAGE.getDataUser();
    const CHOISE = button.getAttribute("data-choise") || "false";
    this.totalCount++;
    if (CHOISE === "true") {
      button.classList.add("true");
      this.statistic.push({
        word: this.data[this.wordNumber].word,
        wordTranslate: this.data[this.wordNumber].wordTranslate,
        choise: true,
      });
      this.curentStreack++;
      this.trueCount++;
      if (this.curentStreack > this.bestStreak)
        this.bestStreak = this.curentStreack;
      SONG_AUDIO_CALL.playSongTrue();
    } else {
      button.classList.add("false");
      this.statistic.push({
        word: this.data[this.wordNumber].word,
        wordTranslate: this.data[this.wordNumber].wordTranslate,
        choise: false,
      });
      this.curentStreack = 0;
      SONG_AUDIO_CALL.playSongFalse();
    }

    if (USER_INFO) {
      AUDIO_CALL_STATISTIC.setStatistic(
        USER_INFO,
        AUDIO_CALL_GAME.bestStreak,
        AUDIO_CALL_GAME.totalCount,
        AUDIO_CALL_GAME.trueCount,
        CHOISE
      );
      const OPTIONAL: OptionalUserWord = {
        dateWhenItBecameLearned:
          CHOISE === "true" ? new Date().toLocaleDateString("en-US") : false,
        dateWhenItBecameNew: new Date().toLocaleDateString("en-US"),
        gameInWhichItBecameNew: "Audio-call",
        sprint: {
          totalCount: 0,
          trueCount: 0,
        },
        audioCall: {
          totalCount: 1,
          trueCount: CHOISE === "true" ? 1 : 0,
        },
      };

      const HAS_PROPERTY = this.data[this.wordNumber].userWord;
      if (!HAS_PROPERTY) {
        await usersWords.createUserWord({
          token: USER_INFO.token,
          id: USER_INFO.userId,
          wordId: this.data[this.wordNumber].id,
          difficulty: CHOISE === "true" ? "learned" : "easy",
          optional: OPTIONAL,
        });
      } else {
        const HAS_OPTIONS = "optional" in HAS_PROPERTY;

        if (HAS_OPTIONS) {
          const OPTIONALS_PROPERTYS =
            this.data[this.wordNumber].userWord.optional;
          HAS_PROPERTY.difficulty = CHOISE === "true" ? "learned" : "easy";

          if (OPTIONALS_PROPERTYS.audioCall) {
            OPTIONALS_PROPERTYS.audioCall.totalCount += 1;
            if (CHOISE === "true") OPTIONALS_PROPERTYS.audioCall.trueCount += 1;
          } else {
            OPTIONALS_PROPERTYS.audioCall = {
              totalCount: 1,
              trueCount: CHOISE === "true" ? 1 : 0,
            };
          }
          const DATE_WORD = OPTIONALS_PROPERTYS.dateWhenItBecameLearned;
          if (CHOISE === "false") {
            OPTIONALS_PROPERTYS.dateWhenItBecameLearned = false;
          } else if (DATE_WORD === false) {
            OPTIONALS_PROPERTYS.dateWhenItBecameLearned =
              new Date().toLocaleDateString("en-US");
          }
          await usersWords.updateUserWord({
            token: USER_INFO.token,
            id: USER_INFO.userId,
            wordId: this.data[this.wordNumber].id,
            difficulty: CHOISE === "true" ? "learned" : "easy",
            optional: OPTIONALS_PROPERTYS,
          });
        } else {
          await usersWords.updateUserWord({
            token: USER_INFO.token,
            id: USER_INFO.userId,
            wordId: this.data[this.wordNumber].id,
            difficulty: CHOISE === "true" ? "learned" : "easy",
            optional: OPTIONAL,
          });
        }
      }
    }
    AUDIO_CALL_GAME.choiseIsMade(CHOISE);
  }

  choiseIsMade(choise: string) {
    const ALL_BUTTONS = document.querySelectorAll("[data-choise]");
    ALL_BUTTONS.forEach((e) => {
      e.classList.add("disable");
      if (choise !== "true" && e.getAttribute("data-choise") === "true") {
        e.classList.add("true");
      }
    });
    this.showWord();
  }

  showNextButton() {
    const BUTTON = <HTMLButtonElement>(
      document.querySelector(".audio-call-game__select")
    );
    BUTTON.classList.add("active");
    this.addListenerNext(BUTTON);
  }

  addListenerNext(button: HTMLButtonElement) {
    button.addEventListener("click", this.finishGame);
  }

  showWord() {
    (<HTMLElement>(
      document.querySelector(".audio-call-game__visual")
    )).classList.add("active");
  }

  async finishGame() {
    AUDIO_CALL_GAME.wordNumber++;
    if (AUDIO_CALL_GAME.wordNumber == AUDIO_CALL_GAME.data.length) {
      KEY_BOARD.removeKeyBoardChoiseListener();
      AUDIO_CALL_RENDER.renderFinish(
        AUDIO_CALL_GAME.statistic,
        AUDIO_CALL_GAME.trueCount,
        AUDIO_CALL_GAME.totalCount - AUDIO_CALL_GAME.trueCount
      );
      AUDIO_CALL_GAME.addRepeatPlayListener();
      AUDIO_CALL_GAME.resetValues();
    } else {
      AUDIO_CALL_GAME.treatmentData(AUDIO_CALL_GAME.data);
    }
  }

  addRepeatPlayListener() {
    (<HTMLButtonElement>(
      document.querySelector(".audio-call-finish__repeat")
    )).addEventListener("click", () => {
      AUDIO_CALL_GAME.treatmentData(AUDIO_CALL_GAME.data);
    });
  }

  resetValues() {
    AUDIO_CALL_GAME.statistic = [];
    AUDIO_CALL_GAME.wordNumber = 0;
    AUDIO_CALL_GAME.bestStreak = 0;
    AUDIO_CALL_GAME.curentStreack = 0;
    AUDIO_CALL_GAME.totalCount = 0;
    AUDIO_CALL_GAME.trueCount = 0;
  }
}

export const AUDIO_CALL_GAME = new AudioGame();
