import {
  FullWord,
  UserWordContent,
  WordContent,
} from "../../interfaces/interfaceServerAPI";
import { IStatistic } from "../../interfaces/caudio-call-game";
import { AUDIO_CALL_RENDER } from "../../pages/audio-call-game/audio-game-render";
import { COMPONENT_LOAD_SCREAN } from "../../components/load-screan/load-screan";
import words from "../services/words";
import usersWordsService from "../services/usersWords";
import { KEY_BOARD } from "./key-board";
import { SONG_AUDIO_CALL } from "./song-audio-call";
//import usersWords from "../services/usersWords";
import { LOCAL_STORAGE } from "../local-storage/local-storage";
//import user from "../services/users";

class AudioGame {
  statusAudio: string;
  statusScrean: string;
  data: WordContent[];
  page: number;
  wordNumber: number;
  statistic: IStatistic[];
  constructor() {
    this.statusAudio = "";
    this.statusScrean = "";
    this.data = [
      {
        id: "string",
        group: 0,
        page: 0,
        word: "string",
        image: "string",
        audio: "string",
        audioMeaning: "string",
        audioExample: "string",
        textMeaning: "string",
        textExample: "string",
        transcription: "string",
        wordTranslate: "string",
        textMeaningTranslate: "string",
        textExampleTranslate: "string",
      },
    ];

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
    AUDIO_CALL_GAME.statistic = [];
    COMPONENT_LOAD_SCREAN.renderLoadScrean();
    const GROUP_WORDS = Number(
      (<HTMLFormElement>document.querySelector(".audio-call-rules__select"))
        .value
    );
    AUDIO_CALL_GAME.data = (
      await words.getWords({ group: GROUP_WORDS, page: AUDIO_CALL_GAME.page })
    ).sort(() => Math.random() - 0.5);
    AUDIO_CALL_GAME.page = Math.floor(Math.random() * 30);
    COMPONENT_LOAD_SCREAN.removeLoadScrean();
    AUDIO_CALL_GAME.treatmentData(AUDIO_CALL_GAME.data);
  }

  async startGameFromVocabulary(data: FullWord[], page: number, group: number) {
    COMPONENT_LOAD_SCREAN.renderLoadScrean();

    AUDIO_CALL_GAME.statistic = [];
    AUDIO_CALL_GAME.page = page;
    const FILTRED_DATA = this.filterData(data);
    console.log("START WORDS", FILTRED_DATA);

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
    console.log("FINISH WORDS", AUDIO_CALL_GAME.data);

    AUDIO_CALL_GAME.treatmentData(AUDIO_CALL_GAME.data);
    COMPONENT_LOAD_SCREAN.removeLoadScrean();
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
      page = 20;
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

  treatmentData(data: WordContent[]) {
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

  userChoise(button: HTMLButtonElement) {
    const CHOISE = button.getAttribute("data-choise") || "false";
    if (CHOISE === "true") {
      button.classList.add("true");
      this.statistic.push({
        word: this.data[this.wordNumber].word,
        wordTranslate: this.data[this.wordNumber].wordTranslate,
        choise: true,
      });
      SONG_AUDIO_CALL.playSongTrue();
    } else {
      button.classList.add("false");
      this.statistic.push({
        word: this.data[this.wordNumber].word,
        wordTranslate: this.data[this.wordNumber].wordTranslate,
        choise: false,
      });
      SONG_AUDIO_CALL.playSongFalse();
    }
    this.choiseIsMade(CHOISE);
  }

  choiseIsMade(choise: string) {
    const ALL_BUTTONS = document.querySelectorAll("[data-choise]");
    ALL_BUTTONS.forEach((e) => {
      e.classList.add("disable");
      if (choise !== "true" && e.getAttribute("data-choise") === "true") {
        e.classList.add("true");
      }
    });
    this.showNextButton();
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
      AUDIO_CALL_GAME.wordNumber = 0;
      AUDIO_CALL_RENDER.renderFinish(AUDIO_CALL_GAME.statistic);
      AUDIO_CALL_GAME.addRepeatPlayListener();
    } else {
      AUDIO_CALL_GAME.treatmentData(AUDIO_CALL_GAME.data);
    }
  }

  addRepeatPlayListener() {
    (<HTMLButtonElement>(
      document.querySelector(".audio-call-finish__repeat")
    )).addEventListener("click", () => {
      AUDIO_CALL_GAME.statistic = [];
      AUDIO_CALL_GAME.treatmentData(AUDIO_CALL_GAME.data);
    });
  }
}

export const AUDIO_CALL_GAME = new AudioGame();
