import aggregatedWordsService from "../../controller/services/aggregatedWords";
import usersWordsService from "../../controller/services/usersWords";
import wordsService from "../../controller/services/words";
import { LOCAL_STORAGE } from "../../controller/local-storage/local-storage";
import {
  AggregatedWordsRequest,
  AuthorizationContent,
  FullWord,
  UserWordContent,
} from "../../interfaces/interfaceServerAPI";
import "./styles/card.scss";
import AudioPlayer from "./AudioPlayer";
import { sprint } from "../../pages/games/sprint/sprint";
import { AUDIO_CALL_GAME } from "../../controller/audio-call-game/audio-call-game";
import { saveUserWord } from "../../controller/utils/saveUserWord";
import { SVG_VOCABULARY } from "./svg";

export default class Vocabulary {
  public el: HTMLElement;

  private audioPlayer: AudioPlayer;

  public words: FullWord[] = [];

  public group = "0";
  public page = 0;

  constructor() {
    this.el = document.createElement("div");
    this.el.classList.add("vocabulary");

    this.audioPlayer = new AudioPlayer();

    if (LOCAL_STORAGE.getVocabularyGroup()) {
      this.group = <string>LOCAL_STORAGE.getVocabularyGroup();
    }

    this.bindEvents();
  }

  async render(): Promise<void> {
    this.el.innerHTML = `${this.renderHeader()}<div class="vocabulary__content"></div>`;
    this.refresh();
  }

  async refresh(): Promise<void> {
    const el: HTMLElement | null = this.el.querySelector(
      ".vocabulary__content"
    );

    if (el) {
      const userData: AuthorizationContent = LOCAL_STORAGE.getDataUser();
      if (this.group != "6") {
        this.words = await wordsService.getWords({
          group: Number(this.group),
          page: this.page,
        });

        if (userData) {
          const userWords: UserWordContent[] =
            await usersWordsService.getUserWords(userData);

          this.words.forEach((word: FullWord) => {
            userWords.some((userWord: UserWordContent) => {
              if (userWord.wordId === word.id) {
                word.userWord = userWord;
                return true;
              }
            });
          });
        }
      } else {
        this.words = await aggregatedWordsService.getAggregatedWords(
          <AggregatedWordsRequest>{
            id: userData.userId,
            filter: JSON.stringify({ "userWord.difficulty": "hard" }),
            wordsPerPage: Number.MAX_SAFE_INTEGER,
          },
          userData.token
        );
      }

      el.innerHTML = `
        ${this.words.map((word: FullWord) => this.renderCard(word)).join("")}
        ${this.group != "6" ? this.renderPagination() : ""}
      `;

      el.className = `vocabulary__content vocabulary__content--group${this.group}`;
    }
  }

  bindEvents(): void {
    this.el.addEventListener("click", async (e: Event) => {
      const target: HTMLElement = <HTMLElement>e.target;

      if (target.classList.contains("vocabulary__link-audio-call")) {
        if (!LOCAL_STORAGE.getDataUser()) {
          e.preventDefault();
        } else {
          setTimeout(() => {
            AUDIO_CALL_GAME.startGameFromVocabulary(
              this.words,
              this.page,
              Number(this.group)
            );
          }, 0);
        }
      }

      if (
        target.classList.contains("vocabulary__link") &&
        target.dataset.group
      ) {
        e.preventDefault();

        (<HTMLElement[]>(
          Array.from(this.el.querySelectorAll(".vocabulary__link"))
        )).forEach((el: HTMLElement) => el.classList.remove("active"));

        target.classList.add("active");

        this.group = target.dataset.group;
        this.page = 0;
        this.refresh();

        LOCAL_STORAGE.setVocabularyGroup(this.group);

        return;
      }

      if (target.classList.contains("game-sprint")) {
        e.preventDefault();
        const activeLink: HTMLElement = <HTMLElement>(
          document.querySelector(".active")
        );
        const groupValue: string | undefined = activeLink.dataset.group;
        const btnPage: HTMLElement = <HTMLElement>(
          document.querySelector(".pagination__button-numbered")
        );
        const pageValue = btnPage.innerHTML;
        if (Number(groupValue) < 6) {
          sprint.startGameFromPage({
            group: Number(groupValue),
            page: +pageValue - 1,
          });
        } else {
          sprint.startGameWithHardWords();
        }
      }

      if (target.classList.contains("button-to-next")) {
        this.page = this.page + 1;
        this.refresh();

        return;
      }

      if (target.classList.contains("button-to-previous")) {
        if (this.page > 0) {
          this.page = this.page - 1;
          this.refresh();
        }

        return;
      }

      const btn: HTMLButtonElement | null = target.closest(".word__button");
      if (btn) {
        const word: FullWord = this.getWord(target);
        if (word) {
          this.audioPlayer.play(word);
        }

        return;
      }

      if (target.classList.contains("button-add-to-difficult")) {
        const word: FullWord = this.getWord(target);

        await this.setDifficulty(word, "hard");
        this.refresh();

        return;
      }

      if (target.classList.contains("button-remove-from-difficult")) {
        const word: FullWord = this.getWord(target);

        await this.setDifficulty(word, "easy");
        this.refresh();

        return;
      }

      if (target.classList.contains("button-learned")) {
        const word: FullWord = this.getWord(target);
        await this.setDifficulty(word, "easy");
        this.refresh();
        await this.addToLearned(word);
        this.refresh();

        return;
      }
    });
  }

  renderHeader(): string {
    return `
      <div class="vocabulary__header">
        <div class="vocabulary__sections">
          <a href="#" class="vocabulary__link ${
            this.group === "0" ? "active" : ""
          }" data-group="0">Группа&nbsp;1</a>
          <a href="#" class="vocabulary__link ${
            this.group === "1" ? "active" : ""
          }" data-group="1">Группа&nbsp;2</a>
          <a href="#" class="vocabulary__link ${
            this.group === "2" ? "active" : ""
          }" data-group="2">Группа&nbsp;3</a>
          <a href="#" class="vocabulary__link ${
            this.group === "3" ? "active" : ""
          }" data-group="3">Группа&nbsp;4</a>
          <a href="#" class="vocabulary__link ${
            this.group === "4" ? "active" : ""
          }" data-group="4">Группа&nbsp;5</a>
          <a href="#" class="vocabulary__link ${
            this.group === "5" ? "active" : ""
          }" data-group="5">Группа&nbsp;6</a>
          ${
            LOCAL_STORAGE.getDataUser()
              ? `<a href="#" class="vocabulary__link ${
                  this.group === "6" ? "active" : ""
                }" data-group="6">Сложные&nbsp;слова</a>`
              : ""
          }
        </div>
        <div class="vocabulary__mine-games">
          <a href="#/all-games/audio-call" data-navigo class="vocabulary__link-audio-call">Аудиовызов</a>
          <a href="/all-games/sprint" data-navigo class="game-sprint">Спринт</a>
        </div>
      </div>
    `;
  }

  renderCard(word: FullWord): string {
    this.renderStatisticWord(word);
    return `
      <div class="card" data-word-id="${word.id}">
        <div class="card__image">
            <img src="https://rs-learnwords-example.herokuapp.com/${
              word.image
            }"></img>
        </div>
        <div class="card__content">
            <div class="card__word">
                <p class="word m10">${word.word}</з>
                <p class="word__transcription m10">${word.transcription}</p>
                <p class="word__translate m10">${word.wordTranslate}</p>
                <button class="word__button audio">
                  <svg><g><path fill="#fff" d="M20.4,2.9c-0.3-0.2-0.7-0.1-1,0.1L9.7,10H3c-0.6,0-1,0.4-1,1v10c0,0.6,0.4,1,1,1h6.7l9.7,7.1c0.2,0.1,0.4,0.2,0.6,0.2   c0.2,0,0.3,0,0.5-0.1c0.3-0.2,0.5-0.5,0.5-0.9V3.8C21,3.4,20.8,3,20.4,2.9z"/><path fill="#fff" d="M27.1,9.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4C27.2,12.1,28,14,28,16s-0.8,3.9-2.3,5.3c-0.4,0.4-0.4,1,0,1.4   c0.2,0.2,0.5,0.3,0.7,0.3c0.2,0,0.5-0.1,0.7-0.3C29,20.9,30,18.6,30,16S29,11.1,27.1,9.3z"/><path fill="#fff" d="M24.7,12.7c-0.4-0.4-1-0.4-1.4,0.1c-0.4,0.4-0.3,1,0.1,1.4c0.5,0.5,0.8,1.2,0.8,1.9s-0.3,1.4-0.8,1.9   c-0.4,0.4-0.4,1-0.1,1.4c0.2,0.2,0.5,0.3,0.7,0.3c0.2,0,0.5-0.1,0.7-0.3c1-0.9,1.5-2.1,1.5-3.3S25.6,13.5,24.7,12.7z"/></g></svg>
                </button>
            </div>
            <div class="card__word-meaning">
                <p class="meaning">${word.textMeaning}</p>
                <p class="meaning__translate">${word.textMeaningTranslate}</p>
            </div>
            <div class="card__word-example">
                <p class="example">${word.textExample}</p>
                <p class="example__translate">${word.textExampleTranslate}</p>
            </div>
            ${
              LOCAL_STORAGE.getDataUser()
                ? `<div class="card__buttons">
                  ${
                    word.userWord?.optional?.dateWhenItBecameLearned
                      ? `<p class="learned">Изученное слово</p>`
                      : `${
                          word.userWord?.difficulty === "hard"
                            ? `<button class="card__button button-remove-from-difficult">Удалить из сложных</button>`
                            : `<button class="card__button button-add-to-difficult">Сложное</button>`
                        }
                      <button class="card__button button-learned">Изученное</button>`
                  }
                  </div>

                  `
                : ""
            }
        </div>
        ${this.renderStatisticWord(word)}   
      </div>
    `;
  }

  renderStatisticWord(data: FullWord) {
    let audioCallTrue = 0;
    let audioCallFalse = 0;
    let audioSprintTrue = 0;
    let audioSprintFalse = 0;
    if (data.userWord?.optional) {
      const STATISTIC_AUDIO_CALL = data.userWord.optional.audioCall;
      const STATISTIC_SPRINT = data.userWord.optional.sprint;
      if (STATISTIC_AUDIO_CALL) {
        audioCallTrue = STATISTIC_AUDIO_CALL.trueCount;
        audioCallFalse =
          STATISTIC_AUDIO_CALL.totalCount - STATISTIC_AUDIO_CALL.trueCount;
      }
      if (STATISTIC_SPRINT) {
        audioSprintTrue = STATISTIC_SPRINT.trueCount;
        audioSprintFalse =
          STATISTIC_SPRINT.totalCount - STATISTIC_SPRINT.trueCount;
      }
    }
    return `
    <div class="statistic">
    <div class="statistic__item">
      <p class="statistic__text">Ответы в играх:</p>
    </div>
    <div class="statistic__item">
      ${SVG_VOCABULARY.true}
    </div>
    <div class="statistic__item">
      ${SVG_VOCABULARY.false}
    </div>
    <div class="statistic__item">
      <p class="statistic__text">Аудиовызов</p>
    </div>
    <div class="statistic__item">
      <p class="statistic__audio-call-true">${audioCallTrue}</p>
    </div>
    <div class="statistic__item">
      <p class="statistic__audio-call-false">${audioCallFalse}</p>
    </div>
    <div class="statistic__item">
      <p class="statistic__text">Спринт</p>
    </div>
    <div class="statistic__item">
      <p class="statistic__sprint-true">${audioSprintTrue}</p>
    </div>
    <div class="statistic__item">
      <p class="statistic__sprint-true">${audioSprintFalse}</p>
    </div>
    </div>
    `;
  }

  renderPagination(): string {
    return `
      <div class="pagination">
        <button class="button pagination__button button-to-previous">&#x2329;</button>
        <button class="button pagination__button-numbered">${
          this.page + 1
        }</button>
        <button class="button pagination__button button-to-next">&#x232A;</button>
      </div>
    `;
  }

  getWord(el: HTMLElement): FullWord {
    const card: HTMLElement | null = el.closest(".card");
    if (card) {
      const wordId: string | undefined = card.dataset.wordId;
      if (wordId) {
        const word: FullWord | undefined = this.words.find(
          (word: FullWord) => word.id == wordId
        );
        if (word) {
          return word;
        }
      }
    }

    throw new Error("Card is not linked to a word.");
  }

  setDifficulty(word: FullWord, difficulty: string): Promise<UserWordContent> {
    return saveUserWord(word, { difficulty });
  }

  addToLearned(word: FullWord) {
    if (word.userWord.difficulty !== "hard") {
      return saveUserWord(word, {
        optional: { dateWhenItBecameLearned: new Date().toISOString() },
      });
    } else {
      return saveUserWord(word, {
        difficulty: "easy",
        optional: { dateWhenItBecameLearned: new Date().toISOString() },
      });
    }
  }
}
