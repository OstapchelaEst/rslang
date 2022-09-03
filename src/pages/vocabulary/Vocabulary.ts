import aggregatedWordsService from "../../controller/services/aggregatedWords";
import usersWordsService from "../../controller/services/usersWords";
import wordsService from "../../controller/services/words";
import { LOCAL_STORAGE } from "../../controller/local-storage/local-storage";
import {
  AggregatedWordsRequest,
  AuthorizationContent,
  FullWord,
  OptionalUserWord,
  UserWord,
  UserWordContent,
} from "../../interfaces/interfaceServerAPI";
import "./styles/card.scss";
import AudioPlayer from "./AudioPlayer";
import { sprint } from "../../pages/games/sprint/sprint";

export default class Vocabulary {
  public el: HTMLElement;

  private audioPlayer: AudioPlayer;

  private words: FullWord[] = [];

  private group = "0";
  private page = 0;

  constructor() {
    this.el = document.createElement("div");
    this.el.classList.add("vocabulary");

    this.audioPlayer = new AudioPlayer();

    this.bindEvents();
  }

  async render(): Promise<void> {
    this.el.innerHTML = `
      ${this.renderHeader()}
      <div class="vocabulary__content"></div>
    `;

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
          userData.token,
          <AggregatedWordsRequest>{
            id: userData.userId,
            filter: JSON.stringify({ "userWord.difficulty": "hard" }),
          }
        );
      }

      el.innerHTML = `
        ${this.words.map((word: FullWord) => this.renderCard(word)).join("")}
        ${this.renderPagination()}
      `;
    }
  }

  bindEvents(): void {
    this.el.addEventListener("click", async (e: Event) => {
      const target: HTMLElement = <HTMLElement>e.target;

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
          <a href="#" class="vocabulary__link active" data-group="0">Группа&nbsp;1</a>
          <a href="#" class="vocabulary__link" data-group="1">Группа&nbsp;2</a>
          <a href="#" class="vocabulary__link" data-group="2">Группа&nbsp;3</a>
          <a href="#" class="vocabulary__link" data-group="3">Группа&nbsp;4</a>
          <a href="#" class="vocabulary__link" data-group="4">Группа&nbsp;5</a>
          <a href="#" class="vocabulary__link" data-group="5">Группа&nbsp;6</a>
          ${
            LOCAL_STORAGE.getDataUser()
              ? `<a href="#" class="vocabulary__link" data-group="6">Сложные&nbsp;слова</a>`
              : ""
          }
        </div>
        <div>
          <a href="#" class="vocabulary__link">Аудиовызов</a>
          <a href="/all-games/sprint" data-navigo class="game-sprint">Спринт</a>
        </div>
      </div>
    `;
  }

  renderCard(word: FullWord): string {
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
                  </div>`
                : ""
            }
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
    return this.createOrUpdateUserWord(
      word,
      difficulty,
      word.userWord?.optional
    );
  }

  addToLearned(word: FullWord) {
    const optional: OptionalUserWord = word.userWord.optional || {};
    optional.dateWhenItBecameLearned = new Date().toLocaleDateString("en-US");

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
