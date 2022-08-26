import { WordContent } from "../../interfaces/interfaceServerAPI";
import { IStatistic } from "../../interfaces/caudio-call-game";
import { AUDIO_CALL_RENDER } from "../../pages/audio-call-game/audio-game-render";
import { COMPONENT_LOAD_SCREAN } from "../../components/load-screan/load-screan";
import words from "../services/words";
import { KEY_BOARD } from "./key-board";

class AudioGame {
  data: WordContent[];
  page: number;
  wordNumber: number;
  statistic: IStatistic[];
  constructor() {
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
    this.page = 1;
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
    const COUNT = Number(
      (<HTMLFormElement>document.querySelector(".audio-call-rules__select"))
        .value
    );
    AUDIO_CALL_GAME.data = (await words.getWords({ group: COUNT, page: AUDIO_CALL_GAME.page })).sort(
      () => Math.random() - 0.5
    );
    COMPONENT_LOAD_SCREAN.removeLoadScrean();
    AUDIO_CALL_GAME.treatmentData(AUDIO_CALL_GAME.data);
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
    this.playWord();
    this.addListenerPlayWord();
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
    const CHOISE = button.getAttribute("data-choise");
    if (CHOISE === "true") {
      button.classList.add("true");
      this.statistic.push({
        word: this.data[this.wordNumber].word,
        wordTranslate: this.data[this.wordNumber].wordTranslate,
        choise: true,
      });
      this.playSongTrue();
    } else {
      button.classList.add("false");
      this.statistic.push({
        word: this.data[this.wordNumber].word,
        wordTranslate: this.data[this.wordNumber].wordTranslate,
        choise: false,
      });
      this.playSongFalse();
    }
    this.choiseIsMade(CHOISE);
  }

  choiseIsMade(choise: string | null) {
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

  finishGame() {
    AUDIO_CALL_GAME.wordNumber++;
    if (AUDIO_CALL_GAME.wordNumber == AUDIO_CALL_GAME.data.length) {
      KEY_BOARD.removeKeyBoardChoiseListener();
      AUDIO_CALL_GAME.wordNumber = 0;
      AUDIO_CALL_RENDER.renderFinish(AUDIO_CALL_GAME.statistic);
      this.addRepeatPlayListener();
    } else {
      AUDIO_CALL_GAME.treatmentData(AUDIO_CALL_GAME.data);
    }
  }

  addListenerPlayWord() {
    (<HTMLButtonElement>(
      document.querySelector(".audio-call-game__play-button")
    )).addEventListener("click", this.playWord);
  }

  playWord() {
    (<HTMLAudioElement>(
      document.querySelector(".audio-call-game__audio")
    )).play();
  }

  playSongTrue() {
    (<HTMLAudioElement>(
      document.querySelector(".audio-call-game__audio-true")
    )).play();
  }

  playSongFalse() {
    (<HTMLAudioElement>(
      document.querySelector(".audio-call-game__audio-false")
    )).play();
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
